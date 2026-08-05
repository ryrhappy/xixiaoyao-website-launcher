import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";
import { validateTargetDirectory } from "../scripts/download-template.mjs";

test("refuses to overwrite a non-empty target directory", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "xxy-template-"));
  writeFileSync(path.join(dir, "keep.txt"), "user data");
  assert.throws(() => validateTargetDirectory(dir), /not empty/i);
});
