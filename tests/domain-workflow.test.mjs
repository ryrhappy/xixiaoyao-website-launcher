import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const skill = await readFile(new URL("../SKILL.md", import.meta.url), "utf8");
const domain = await readFile(new URL("../references/domain.md", import.meta.url), "utf8");

test("guides users from no domain through purchase and binding", () => {
  assert.match(skill, /If the user has no domain, guide domain search, purchase, and binding instead of stopping to ask them to buy one independently/i);
  assert.match(domain, /vercel domains search/i);
  assert.match(domain, /Purchase and account boundary/i);
  assert.match(domain, /Resume immediately after the user confirms ownership/i);
});

test("limits purchase choices to Vercel Domains and GoDaddy", () => {
  assert.match(domain, /Vercel Domains/);
  assert.match(domain, /GoDaddy/);
  assert.doesNotMatch(domain, /Namecheap|Porkbun|Alibaba|Tencent|阿里云|腾讯云/i);
});

test("requires root, www, redirect, DNS, and HTTPS verification", () => {
  assert.match(domain, /apex/i);
  assert.match(domain, /www/);
  assert.match(domain, /redirect/i);
  assert.match(domain, /HTTPS/);
});

test("does not add mainland-China commentary to domain handoff", () => {
  assert.doesNotMatch(domain, /mainland|China|中国大陆|备案/i);
  assert.doesNotMatch(skill, /Costs, unresolved warnings, and mainland-China access boundary/i);
});

test("defaults to the cheapest first-year domain across suffixes", () => {
  assert.match(domain, /Default “cheapest” to the lowest current first registration charge without restricting the suffix/i);
  assert.match(domain, /Do not ask the user to choose between first-year and long-term cost unless they request a different definition/i);
  assert.match(domain, /sort_by\(\.purchasePrice, \.renewalPrice\)/i);
  assert.match(domain, /show the renewal charge beside every first-year price/i);
});
