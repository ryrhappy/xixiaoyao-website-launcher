import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";
import { inspectProject } from "../scripts/inspect-project.mjs";

test("classifies an empty directory as a new project", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "xxy-new-"));
  assert.equal(inspectProject(dir).mode, "new");
});

test("preserves and identifies an existing Vite project", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "xxy-existing-"));
  writeFileSync(
    path.join(dir, "package.json"),
    JSON.stringify({ scripts: { build: "vite build" }, dependencies: { vite: "latest" } }),
  );
  mkdirSync(path.join(dir, ".git"));
  const result = inspectProject(dir);
  assert.equal(result.mode, "existing");
  assert.equal(result.framework, "vite");
  assert.equal(result.hasGitHistory, true);
  assert.equal(result.buildCommand, "npm run build");
});
