---
name: api-backend-engineering
description: Guidelines for building production REST and GraphQL backend services, robust input validation, centralized error responses, timeout safety, and security best practices.
license: MIT
compatibility: Kiro, Claude Code, Cursor, Antigravity
metadata:
  category: backend-engineering
  complexity: intermediate
---

# API & Backend Engineering

Patterns and protocols for reliable backend service development.

## 1. Request Handling & Routing
- Use predictable HTTP methods: `GET` (read), `POST` (create), `PUT`/`PATCH` (update), `DELETE` (remove).
- Use proper HTTP status codes:
  - `200 OK` / `201 Created` / `204 No Content`
  - `400 Bad Request` / `401 Unauthorized` / `403 Forbidden` / `404 Not Found`
  - `422 Unprocessable Entity` (Schema validation failure)
  - `500 Internal Server Error` (Unexpected server issue)

## 2. Standardized Error Response Structure
All error responses must match this structure:
```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Input validation failed for requested payload",
    "details": [
      { "field": "email", "issue": "Invalid email address format" }
    ]
  }
}
```

## 3. Security & Validation
- Validate all incoming request bodies, headers, and query parameters before reaching business logic (e.g. Zod, Joi, Pydantic).
- Never concatenate raw user input into SQL queries or shell executions.
- Enforce rate-limiting, CORS whitelisting, and secure cookie headers (`HttpOnly`, `Secure`, `SameSite=Strict`).
- Mask sensitive attributes (passwords, tokens, personal identifiers) in logs and trace dumps.

## 4. Resilience
- Always configure timeout parameters on external network requests and database connection pools.
- Implement exponential backoff with jitter on retries for idempotent operations.
