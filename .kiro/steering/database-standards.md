---
inclusion: fileMatch
fileMatch: "**/*.{sql,prisma,db,migration.ts,migrations/**/*.py,schema.ts}"
---

# Database & PostgreSQL Standards

## 1. Schema & Migration Safety
- **Idempotency**: All migrations must be reproducible and include reversible down/rollback logic.
- **Lock Safety**: Avoid blocking table-wide Exclusive Locks in production. Add indexes concurrently (`CREATE INDEX CONCURRENTLY`).
- Foreign keys and column types must align with domain entities; use explicit foreign key constraints and cascades cautiously.

## 2. Query Optimization
- Use `EXPLAIN ANALYZE` to diagnose query cost, sequential scans, and index utilization.
- Index all foreign key columns and frequently filtered columns (`WHERE`, `ORDER BY`, `JOIN`).
- Prevent N+1 queries by using `JOIN` queries or batch loaders.

## 3. Safe Execution
- Non-destructive execution first: always default to read-only queries (`SELECT`).
- Never run bulk `UPDATE` or `DELETE` statements without explicit `WHERE` clauses and transaction blocks (`BEGIN...COMMIT`).
