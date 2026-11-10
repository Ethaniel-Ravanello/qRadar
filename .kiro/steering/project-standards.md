---
inclusion: always
---

# Core Project Standards (High Context-Efficiency)

## 1. Operating Discipline
- **Zero Assumptions**: State assumptions explicitly. Stop and ask if requirements, parameters, or edge cases are ambiguous.
- **Simplicity First**: Write the minimum code required to solve the problem. Avoid speculative abstractions, generic wrappers, or unrequested features.
- **Surgical Precision**: Touch only what you must. Preserve existing code formatting, patterns, and conventions. Never delete or refactor unrelated code.
- **Clean Diffs**: Clean up imports, variables, and temporary artifacts introduced by your own changes.

## 2. Goal-Driven Verification
- Define verifiable completion criteria before modifying code.
- Validate every change (run tests, typecheck, or verify output) before marking done.
