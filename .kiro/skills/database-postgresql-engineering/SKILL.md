---
name: database-postgresql-engineering
description: PostgreSQL and database engineering toolkit. Use when inspecting database schemas, drafting safe SQL migrations, analyzing query execution plans (EXPLAIN ANALYZE), adding indexes, and optimizing data models.
license: MIT
compatibility: Kiro, Claude Code, Cursor, Antigravity
metadata:
  category: database-engineering
  complexity: intermediate
---

# Database & PostgreSQL Engineering

Best practices for relational database modeling, safe schema migrations, and query tuning.

## 1. Schema & Migration Guidelines
- **Idempotency**: All migrations must be idempotent and provide tested down/rollback operations.
- **Lock Avoidance**:
  - Never execute blocking `ALTER TABLE` operations that acquire `ACCESS EXCLUSIVE` locks on high-traffic tables.
  - Create indexes concurrently in PostgreSQL:
    ```sql
    CREATE INDEX CONCURRENTLY idx_users_email ON users(email);
    ```
  - When adding columns with defaults in older PostgreSQL versions, set default after adding column or use nullable default to prevent full-table rewrites.

## 2. Query Diagnostics & Index Tuning
- Always inspect execution plans with `EXPLAIN (ANALYZE, BUFFERS)` for slow queries:
  - Watch for unwanted `Seq Scan` on large tables.
  - Check for index filter penalties and high buffer reads.
- Composite Index Order: Place equality columns first (`col = value`), followed by range or sort columns (`col > value`, `ORDER BY col`).

## 3. Safe Execution Protocol
- Default to read-only queries (`SELECT`, `EXPLAIN`).
- Always wrap state changes inside explicit transactions:
  ```sql
  BEGIN;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  -- verify affected rows before COMMIT
  COMMIT;
  ```
- Never execute destructive commands (`DROP TABLE`, `TRUNCATE`) without explicit confirmation.
