import type { StackPreset } from "./stacks"

export function makeUserPrompt(input: string, stack?: StackPreset) {
    return `
INPUT:
${input}

${stack ? `
STACK PRESET (MANDATORY):
Frontend: ${stack.frontend.join(", ")}
Backend: ${stack.backend.join(", ")}
Database: ${stack.database.join(", ")}
Notes: ${stack.notes?.join(", ") ?? "None"}
` : ""}

TASK:
Populate the PRD schema for a modern web application.

RULES:
- Use the provided stack exactly
- Do not introduce alternative technologies
- Prefer simplicity over extensibility
`
}