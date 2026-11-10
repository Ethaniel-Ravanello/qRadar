---
inclusion: fileMatch
fileMatch: "**/*.{ts,js,py,go,java,rs,rb,php}"
---

# Backend & API Standards

## 1. API Design & Routing
- Use resource-oriented URL conventions (`/api/v1/resources/:id`).
- Strictly adhere to standard HTTP status codes (`200 OK`, `201 Created`, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `422 Unprocessable Entity`, `500 Server Error`).
- Standardize JSON error payload schema:
  ```json
  { "error": { "code": "ERROR_CODE", "message": "Clear explanation", "details": [] } }
  ```

## 2. Validation & Security
- Never trust incoming client data: validate all request bodies, headers, and query parameters via strict schemas (Zod, Pydantic, Joi).
- Parameterize all database queries; never concatenate raw strings into SQL.
- Never commit secrets or credentials. Read strictly from environment variables.
- Mask and sanitize passwords, access tokens, and sensitive PII from application logs.

## 3. Resiliency
- Implement explicit timeouts for all external HTTP requests and database connections.
- Handle edge cases and unexpected failures gracefully with structured exceptions.
