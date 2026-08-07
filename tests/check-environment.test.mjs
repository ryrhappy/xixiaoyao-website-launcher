import assert from "node:assert/strict";
import { test } from "node:test";
import { checkEnvironment } from "../scripts/check-environment.mjs";

test("reports required and optional commands separately", () => {
  const result = checkEnvironment({
    platform: "darwin",
    run(command) {
      const outputs = {
        "git --version": { ok: true, output: "git version 2.49.0" },
        "node --version": { ok: true, output: "v22.17.0" },
        "npm --version": { ok: true, output: "10.9.2" },
        "gh --version": { ok: false, output: "not found" },
        "netlify --version": { ok: false, output: "not found" },
      };
      return outputs[command];
    },
  });

  assert.equal(result.readyForLocalBuild, true);
  assert.equal(result.tools.gh.required, false);
  assert.equal(
    result.tools.netlify.fallback,
    "npm exec --yes --package=netlify-cli@latest -- netlify",
  );
});
