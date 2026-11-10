---
name: spec-driven-development
description: Three-phase feature planning (Requirements with EARS syntax, Technical Design with ADRs, and Task sequencing). Use when designing or building non-trivial features to prevent hallucinations, reduce rework, and eliminate ambiguity.
license: MIT
compatibility: Kiro, Claude Code, Cursor, Antigravity
metadata:
  category: methodology
  complexity: intermediate
---

# Spec-Driven Development

A systematic three-phase methodology for software feature development.

## Phase 1: Requirements Engineering (EARS)
Transform feature goals into testable acceptance criteria using EARS syntax:
- **Ubiquitous**: `THE [system] SHALL [response]`
- **Event-Driven**: `WHEN [event] THEN [system] SHALL [response]`
- **State-Driven**: `WHILE [state] THE [system] SHALL [response]`
- **Conditional**: `IF [condition] THEN [system] SHALL [response]`
- **Complex**: `WHEN [event] AND IF [condition] THEN [system] SHALL [response]`

## Phase 2: Technical Design & Architecture
1. **Architecture & Boundaries**: Define modules, data structures, and APIs.
2. **Architecture Decision Records (ADR)**:
   - **Context**: Problem statement.
   - **Options**: Evaluated alternatives with pros & cons.
   - **Decision & Rationale**: Chosen approach and why.
3. **Resilience**: Define explicit failure scenarios, timeout thresholds, and fallbacks.

## Phase 3: Actionable Task Sequencing
Deconstruct the design into sequential, testable task items:
```markdown
- [ ] 1. Core Interfaces & Type Definitions
- [ ] 2. Data Access / Persistence Layer
- [ ] 3. Business Service & Domain Logic
- [ ] 4. API / Controller Endpoints
- [ ] 5. Frontend Components & UI Interactivity
- [ ] 6. End-to-End Verification & Edge Case Testing
```

## Execution Guardrails
- Work in order: Requirements -> Design -> Tasks -> Implementation.
- Stop and ask when assumptions cannot be proven from code.
- Verify each completed task against its acceptance criteria before moving to the next.
