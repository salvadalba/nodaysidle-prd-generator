import { STACK_PRESETS } from "./stacks"
import { makeUserPrompt } from "./compilerPrompt"
import { invoke } from "@tauri-apps/api/core"
import { renderPRD } from "./renderer"

console.log("PRD Compiler app loaded")

function isTauri(): boolean {
  return "__TAURI_INTERNALS__" in window
}

const root = document.getElementById("app")
if (!root) {
  throw new Error("Root #app not found")
}

root.innerHTML = `
  <h1>PRD Compiler</h1>

  <label>Stack preset</label><br />
  <select id="stack"></select>

  <br /><br />

  <label>Project input</label><br />
  <textarea id="input" rows="8" style="width: 100%;"></textarea>

  <br /><br />

  <button id="generate">Generate PRD</button>

  <br /><br />

  <label>Output</label><br />
  <textarea id="output" rows="14" style="width: 100%;" readonly></textarea>
`

// ---- wire DOM elements ----
const stackSelect = document.getElementById("stack") as HTMLSelectElement
const inputEl = document.getElementById("input") as HTMLTextAreaElement
const outputEl = document.getElementById("output") as HTMLTextAreaElement
const generateBtn = document.getElementById("generate") as HTMLButtonElement

// ---- populate stack presets ----
for (const stack of STACK_PRESETS) {
  const opt = document.createElement("option")
  opt.value = stack.id
  opt.textContent = `${stack.name} — ${stack.description}`
  stackSelect.appendChild(opt)
}

// ---- Generate PRD ----
generateBtn.onclick = async () => {
  outputEl.value = "Generating PRD…"

  const selectedStack = STACK_PRESETS.find(s => s.id === stackSelect.value)
  const payload = makeUserPrompt(inputEl.value, selectedStack)

  // ---- Browser fallback ----
  if (!isTauri()) {
    outputEl.value =
      "⚠️ Running in browser mode.\n\nUse `npx tauri dev` to generate PRDs."
    return
  }

  try {
    const raw = await invoke<string>("compile_prd", { input: payload })
    const data = JSON.parse(raw)
    outputEl.value = renderPRD(data)
  } catch (err) {
    outputEl.value = `ERROR:\n${String(err)}`
  }
}