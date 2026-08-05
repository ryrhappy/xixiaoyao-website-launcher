#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

function readJson(file) {
  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}

function detectFramework(pkg, directory) {
  const dependencies = { ...(pkg?.dependencies || {}), ...(pkg?.devDependencies || {}) };
  if (dependencies.next || existsSync(path.join(directory, "next.config.js")) || existsSync(path.join(directory, "next.config.ts"))) return "nextjs";
  if (dependencies.nuxt) return "nuxt";
  if (dependencies["@sveltejs/kit"]) return "sveltekit";
  if (dependencies.astro) return "astro";
  if (dependencies.vite) return "vite";
  if (dependencies.vue) return "vue";
  if (dependencies.react) return "react";
  if (existsSync(path.join(directory, "index.html"))) return "static-html";
  return "unknown";
}

function detectPackageManager(directory) {
  if (existsSync(path.join(directory, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(path.join(directory, "yarn.lock"))) return "yarn";
  if (existsSync(path.join(directory, "bun.lock")) || existsSync(path.join(directory, "bun.lockb"))) return "bun";
  return "npm";
}

export function inspectProject(directory) {
  const entries = existsSync(directory) ? readdirSync(directory).filter((name) => name !== ".DS_Store") : [];
  if (entries.length === 0) return { mode: "new", directory };
  const pkg = readJson(path.join(directory, "package.json"));
  const packageManager = detectPackageManager(directory);
  const run = packageManager === "npm" ? "npm run" : packageManager;
  return {
    mode: "existing",
    directory,
    framework: detectFramework(pkg, directory),
    packageManager,
    hasGitHistory: existsSync(path.join(directory, ".git")),
    buildCommand: pkg?.scripts?.build ? `${run} build` : null,
    devCommand: pkg?.scripts?.dev ? `${run} dev` : null,
    hasEnvironmentFiles: entries.some((name) => /^\.env($|\.)/.test(name) && name !== ".env.example"),
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const directory = path.resolve(process.argv[2] || process.cwd());
  process.stdout.write(`${JSON.stringify(inspectProject(directory), null, 2)}\n`);
}
