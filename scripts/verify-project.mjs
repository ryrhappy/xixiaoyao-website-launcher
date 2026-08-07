#!/usr/bin/env node
import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const ignoredDirectories = new Set([".git", ".next", ".netlify", "node_modules", "dist", "build"]);
const sensitiveNames = [/^\.env$/, /^\.env\.(?!example$).+/, /service[-_]?account.*\.json$/i, /credentials.*\.json$/i];

export function findSensitiveFiles(directory, current = directory) {
  if (!existsSync(current)) return [];
  const found = [];
  for (const name of readdirSync(current)) {
    const full = path.join(current, name);
    if (statSync(full).isDirectory()) {
      if (!ignoredDirectories.has(name)) found.push(...findSensitiveFiles(directory, full));
      continue;
    }
    if (sensitiveNames.some((pattern) => pattern.test(name))) {
      found.push(path.relative(directory, full));
    }
  }
  return found.sort();
}

export function verifyProject(directory) {
  const sensitiveFiles = findSensitiveFiles(directory);
  return { safeToReviewForCommit: sensitiveFiles.length === 0, sensitiveFiles };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const directory = path.resolve(process.argv[2] || process.cwd());
  const result = verifyProject(directory);
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  process.exitCode = result.safeToReviewForCommit ? 0 : 2;
}
