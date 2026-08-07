import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const skill = await readFile(new URL("../SKILL.md", import.meta.url), "utf8");
const domain = await readFile(new URL("../references/domain.md", import.meta.url), "utf8");

test("uses the free Netlify subdomain when the user owns no domain", () => {
  assert.match(skill, /use the free `[^`]+\.netlify\.app` address/i);
  assert.match(domain, /Do not start a domain-purchase workflow/i);
  assert.match(domain, /keep the default `[^`]+\.netlify\.app` address/i);
});

test("binds only a custom domain the user already owns", () => {
  assert.match(domain, /Add a domain you already own/i);
  assert.match(domain, /Pending DNS verification/i);
  assert.match(domain, /HTTPS/i);
});

test("contains no registrar or payment guidance", () => {
  const guidance = domain.replace(/Do not start a domain-purchase workflow/i, "");
  assert.doesNotMatch(guidance, /purchase|buy|registrar|payment|renewal|GoDaddy|Vercel/i);
});
