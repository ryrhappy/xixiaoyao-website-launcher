#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import path from "node:path";

export const DEFAULT_TEMPLATE = "ryrhappy/xixiaoyao-nextjs-starter#v1.0.0";

export function validateTargetDirectory(directory) {
  if (existsSync(directory) && readdirSync(directory).filter((name) => name !== ".DS_Store").length > 0) {
    throw new Error(`Target directory is not empty: ${directory}`);
  }
}

export function downloadTemplate(directory, template = DEFAULT_TEMPLATE) {
  validateTargetDirectory(directory);
  mkdirSync(path.dirname(directory), { recursive: true });
  execFileSync("npx", ["--yes", "degit", template, directory], { stdio: "inherit" });
  return { directory, template };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const directory = path.resolve(process.argv[2] || "my-website");
  const template = process.argv[3] || DEFAULT_TEMPLATE;
  process.stdout.write(`${JSON.stringify(downloadTemplate(directory, template), null, 2)}\n`);
}
