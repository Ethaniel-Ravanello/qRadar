---
inclusion: fileMatch
fileMatch: "**/*{Dockerfile*,docker-compose*,compose.yaml,compose.yml,.dockerignore}*"
---

# Docker & Containerization Standards

## 1. Multi-Stage Builds & Minimal Footprint
- Always use multi-stage builds (`build` stage vs `production` runner) to exclude build tools and dev dependencies from the final image.
- Prefer minimal base images (e.g. `node:alpine`, `python:slim`, `golang:alpine`) to reduce attack surface and build size.
- Pin specific version tags; avoid unpinned `:latest` tags in reproducible setups.

## 2. Layer Caching Efficiency
- Order commands by volatility: copy dependency manifests first (`package*.json`, `requirements.txt`, `go.mod`), run install, then copy source code:
  ```dockerfile
  COPY package*.json ./
  RUN npm ci --only=production
  COPY . .
  ```
- Always provide a `.dockerignore` ignoring `node_modules`, `.git`, `.env`, test artifacts, and build outputs.

## 3. Security & Non-Root Execution
- Never run containers as `root` in production: create and switch to a dedicated non-privileged user:
  ```dockerfile
  RUN addgroup -S appgroup && adduser -S appuser -G appgroup
  USER appuser
  ```
- Never bake credentials or secrets into the image. Inject configs via environment variables or secret mounts at runtime.

## 4. Docker Compose & Services
- Define explicit healthchecks for dependent services (e.g. PostgreSQL, Redis) using `condition: service_healthy`.
- Name internal networks and bind ports explicitly (`127.0.0.1:5432:5432` for local databases).
- Use named volumes for persistent database state.
