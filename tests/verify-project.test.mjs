import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";
import { findSensitiveFiles } from "../scripts/verify-project.mjs";

test("flags real env files but allows env examples", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "xxy-secrets-"));
  writeFileSync(path.join(dir, ".env"), "SECRET=value\n");
  writeFileSync(path.join(dir, ".env.example"), "SECRET=<fill-in-vercel>\n");
  assert.deepEqual(findSensitiveFiles(dir), [".env"]);
});
