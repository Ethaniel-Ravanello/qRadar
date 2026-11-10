---
name: graphify-knowledge-graph
description: Codebase architecture navigation and structural graph traversal. Use when analyzing dependencies, tracing cross-file connections, or exploring codebases to prevent scanning hundreds of raw files and save context tokens.
license: MIT
compatibility: Kiro, Claude Code, Cursor, Antigravity
metadata:
  category: architecture
  complexity: intermediate
---

# Graphify Knowledge Graph Navigation

A high-efficiency skill to understand and navigate codebases using structured knowledge graphs without wasting token context.

## When to Use
- The user asks about architecture, module dependencies, or data flow across files.
- Entering an unfamiliar repository with many interconnected files.
- Locating key "god-nodes" and architectural hotspots before implementing broad changes.

## Operating Principles
1. **Check for `graphify-out/`**:
   - If `graphify-out/` exists in the repository root, inspect `graphify-out/GRAPH_REPORT.md` first.
   - Do NOT burn thousands of tokens reading every source file one by one.
2. **Structural Traversal**:
   - Query `graphify-out/graph.json` to inspect relationship edges (`imports`, `calls`, `inherits`, `depends_on`).
   - Use `graph.html` for interactive visualization.
3. **Keep Synchronized**:
   - When major refactoring or additions occur, recommend updating the knowledge graph via `python -m graphify . --update`.
