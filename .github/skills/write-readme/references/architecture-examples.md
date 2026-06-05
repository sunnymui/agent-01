# Architecture Documentation Examples

Good architecture documentation helps developers understand how and where to make changes — whether they are new to a project or not. Use this when the project has a complex system design worth documenting.

## When to include an Architecture section

- Multi-service or distributed systems
- Non-obvious data flows (e.g., event-driven, pipelines)
- Projects with strict design invariants
- When onboarding friction is high due to complexity

## What makes good architecture docs

- **Diagrams** — visual representations of the system, stack, or data flow
- **Source code maps** — what each key file/directory is responsible for
- **Invariants** — rules that must never be violated
- **Design decisions** — why key choices were made (not just what)
- **Processes/lifecycle** — how the system initializes and runs

## Format options

| Format | Best for |
|--------|---------|
| Section inside README.md | Small-to-medium projects |
| Separate `ARCHITECTURE.md` | Large codebases, open source |
| `/docs/architecture/` directory | Multi-document systems (e.g., GitLab) |

## Real-world Examples

- [esbuild](https://github.com/evanw/esbuild/blob/main/docs/architecture.md) - Great use of graphics for visualisations and project structure. Includes a list of important principles for the project.
- [Flutter Engine](https://github.com/flutter/flutter/blob/master/docs/about/The-Engine-architecture.md) - Good use of high level diagrams to show the stack and its parts. Describes the main processes. Describes platform invariants.
- [GitLab](https://gitlab.com/gitlab-org/charts/gitlab/-/tree/master/doc/architecture) - Calls out design decisions.
- [Linux cryptography](https://github.com/torvalds/linux/blob/master/Documentation/crypto/architecture.rst) - Calls out different types of components, provides searchable areas, calls out invariants of different components, and describes structure with diagrams.
- [Neovim](https://github.com/neovim/neovim/blob/master/src/nvim/README.md) - Describes the main processes/lifecycle.
- [Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh/wiki/Design) - Describes the initialization process, calls out environment requirements.
- [Redis](https://github.com/redis/redis/blob/unstable/README.md) - Good source code map. Overviews of key files. Good use of documentation comments in-code rather than inline comments.
- [Tauri](https://github.com/tauri-apps/tauri/blob/dev/ARCHITECTURE.md) - Well made source code map, discusses architecture considerations, calls out important dependencies.
- [VS Code](https://github.com/microsoft/vscode/wiki/Source-Code-Organization) - Good use of high-level diagrams. Describes source organisation.

## Relevant articles

- ["ARCHITECTURE.md"](https://matklad.github.io/2021/02/06/ARCHITECTURE.md.html) - *Alex Kladov* — argues every non-trivial open-source project should have one
- ["Two open source projects with great documentation"](https://johnjago.com/great-docs/) - *John Jago*
