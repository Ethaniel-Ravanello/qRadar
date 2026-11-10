---
name: docker-devops-containerization
description: Comprehensive Docker, Docker Compose, containerization, and local environment setup. Use when writing Dockerfiles, configuring docker-compose with database/cache services, container networking, and deployment setups.
license: MIT
compatibility: Kiro, Claude Code, Cursor, Antigravity
metadata:
  category: devops
  complexity: intermediate
---

# Docker & DevOps Containerization

Step-by-step procedures to containerize web apps, backend APIs, and multi-service environments.

## 1. Containerizing Web & Frontend (Vite/React/Vue/Next)
For SPA (Vite/React) deployed with an Nginx reverse proxy:
```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 2. Containerizing Backend APIs (Node/Express/Python/Go)
```dockerfile
FROM node:20-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

# Install production dependencies only
COPY package*.json ./
RUN npm ci --only=production

# Copy built code
COPY dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

## 3. Multi-Service Docker Compose Setup (App + PostgreSQL + Redis)
```yaml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://appuser:secret@db:5432/appdb
      - REDIS_URL=redis://cache:6379
    depends_on:
      db:
        condition: service_healthy
      cache:
        condition: service_started
    networks:
      - app-net

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: appuser
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: appdb
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U appuser -d db"]
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - app-net

  cache:
    image: redis:7-alpine
    networks:
      - app-net

volumes:
  pgdata:

networks:
  app-net:
    driver: bridge
```

## 4. Verification & Diagnostics
- Check running containers: `docker compose ps`
- Inspect container logs: `docker compose logs -f <service>`
- Validate container health: `docker inspect --format='{{json .State.Health}}' <container_id>`
