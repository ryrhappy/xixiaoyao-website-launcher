#!/usr/bin/env node
import { execSync } from "node:child_process";

function defaultRun(command) {
  try {
    return { ok: true, output: execSync(command, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim() };
  } catch (error) {
    return { ok: false, output: error.stderr?.toString().trim() || "not found" };
  }
}

export function checkEnvironment({ platform = process.platform, run = defaultRun } = {}) {
  const definitions = {
    git: { command: "git --version", required: true },
    node: { command: "node --version", required: true },
    npm: { command: "npm --version", required: true },
    gh: { command: "gh --version", required: false },
    netlify: {
      command: "netlify --version",
      required: false,
      fallback: "npm exec --yes --package=netlify-cli@latest -- netlify",
    },
  };
  const tools = {};
  for (const [name, definition] of Object.entries(definitions)) {
    const result = run(definition.command) || { ok: false, output: "not found" };
    tools[name] = { ...definition, installed: result.ok, version: result.output };
  }
  return {
    platform,
    readyForLocalBuild: tools.git.installed && tools.node.installed && tools.npm.installed,
    tools,
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.stdout.write(`${JSON.stringify(checkEnvironment(), null, 2)}\n`);
}
