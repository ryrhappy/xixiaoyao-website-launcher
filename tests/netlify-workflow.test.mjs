import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const referenceNames = (await readdir(new URL("references/", root))).sort();
const productionFiles = [
  "SKILL.md",
  "agents/openai.yaml",
  "scripts/check-environment.mjs",
  "scripts/verify-project.mjs",
  ...referenceNames.map((name) => `references/${name}`),
];
const combined = (
  await Promise.all(productionFiles.map((name) => readFile(new URL(name, root), "utf8")))
).join("\n");

test("uses Netlify as the only deployment provider", () => {
  assert.match(combined, /Netlify/);
  assert.match(combined, /netlify deploy/);
  assert.doesNotMatch(combined, /Vercel|GoDaddy/i);
  assert.ok(referenceNames.includes("netlify.md"));
  assert.ok(!referenceNames.includes("vercel.md"));
});

test("requires preview, production confirmation, and Git continuous deployment", () => {
  assert.match(combined, /preview deployment/i);
  assert.match(combined, /confirm production/i);
  assert.match(combined, /continuous deployment/i);
  assert.match(combined, /Link repository/i);
});
