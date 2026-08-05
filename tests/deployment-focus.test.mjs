import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const skill = await readFile(new URL("../SKILL.md", import.meta.url), "utf8");

test("deployment is the central workflow", () => {
  assert.match(skill, /deployment-first/i);
  assert.ok(
    skill.indexOf("### Existing project") < skill.indexOf("### New project"),
    "the existing-project deployment route should be presented first",
  );
});

test("existing projects skip website creation discovery", () => {
  assert.match(
    skill,
    /Do not ask about pages, style, content, or a database unless the user also asks to change the website or deployment is blocked/i,
  );
});

test("new projects rejoin the shared deployment path", () => {
  assert.match(skill, /then immediately continue with the shared deployment workflow/i);
});
