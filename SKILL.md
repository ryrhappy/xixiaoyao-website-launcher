---
name: xixiaoyao-website-launcher
description: Use when a non-technical user wants to create or deploy a website, publish it through GitHub and Vercel, purchase a domain, configure DNS, or connect a custom domain.
---

# 夕小瑶 AI 网站上线助手

## Overview

This is a deployment-first guide. Its main job is to take a website project through local verification, GitHub, Vercel, and an optional custom domain. If a project already exists, deploy it directly. Only when no project exists, create one from the fixed versioned starter and then return to the same deployment workflow.

Stop at every account, payment, secret, public-repository, production, and DNS boundary that requires the user's action or confirmation.

## Non-negotiable rules

- Ask one short question at a time. Translate Git, CLI, DNS, build, repository, and environment variable into plain language on first use.
- Inspect before changing. Never replace an existing project's framework with the starter.
- Never delete `.git`, overwrite a non-empty directory, force-push, or discard uncommitted work.
- Never request passwords, access tokens, API keys, database passwords, or cookies in chat.
- Never commit `.env*` except `.env.example`. Run `scripts/verify-project.mjs` before staging.
- Do not buy a domain, accept terms, solve a CAPTCHA, or approve a paid operation for the user.
- Do not promise that every website is compatible with Vercel. Explain the concrete blocker and recommend another host when adaptation would materially change the architecture.
- Build and preview locally before GitHub; verify a preview deployment before production; verify production before connecting a domain.

## Route first

Resolve the project directory and inspect it before asking broad website questions. Use the inspection result, not the user's technical vocabulary.

### Existing project

If the directory contains a project, say clearly that it will be deployed as-is. Keep its framework, package manager, Git history, lockfile, configuration, and unrelated changes. Identify its build command and Vercel compatibility, then enter the shared deployment workflow.

Do not ask about pages, style, content, or a database unless the user also asks to change the website or deployment is blocked. Ask only for information required to deploy, such as the project path, missing environment-variable names, GitHub visibility, Vercel account action, or domain choice.

### New project

If the user has no project, explain that the Skill will first create the smallest usable project and then deploy it. Ask only for the minimum information needed to replace the starter content: project name, website purpose, essential page or action, and any real text or images already available.

Confirm an absent or empty absolute directory, then run:

```bash
node <skill-dir>/scripts/download-template.mjs "<new-empty-directory>"
```

The default source is the tested `v1.0.0` tag of `ryrhappy/xixiaoyao-nextjs-starter`. Do not download `main`. If the tag cannot be fetched, explain the failure and offer `create-next-app` as a fallback. Retain the starter's Next.js, React, TypeScript, App Router, Tailwind CSS, responsive, metadata, and 404 foundations. Replace only the generic content needed for the user's first usable version, then immediately continue with the shared deployment workflow.

For new features that require login, saved forms, comments, uploads, collections, or an admin panel, recommend Supabase and read `references/supabase.md`. Do not introduce a database for a static site or simple deployment. A simple email contact form may use a form or email service instead.

## Shared deployment workflow

### 1. Check the environment and project

Run:

```bash
node <skill-dir>/scripts/check-environment.mjs
node <skill-dir>/scripts/inspect-project.mjs "<project-directory>"
```

GitHub CLI is needed when creating or pushing a repository. Use `npx vercel` when a global Vercel CLI is absent. Node.js and npm are required for the default starter; for an existing project, respect its detected runtime and package manager.

If a required tool is missing, explain what it is and give the official installation path for the user's operating system. Resume only after rechecking.

### 2. Verify locally

1. Install with the detected package manager and existing lockfile.
2. Run lint, typecheck, tests, and production build when scripts exist.
3. Start the documented preview command.
4. For a newly created or intentionally modified site, ask the user to approve content, appearance, mobile layout, and public contact details.
5. Fix errors before continuing. Never treat a successful install as a successful build.

### 3. Publish to GitHub

Read `references/github.md`. Before creating an external repository, confirm the repository name and public/private visibility. Preserve existing remotes and history. Show `git status` and run:

```bash
node <skill-dir>/scripts/verify-project.mjs "<project-directory>"
```

Review every flagged file. A clean result permits review and staging; it does not prove that file contents are secret-free. Inspect the staged diff before commit and push.

### 4. Deploy to Vercel

Read `references/vercel.md`. Prefer Git-connected deployment so future pushes redeploy automatically. Use a preview deployment first. Configure environment variables in Vercel, not source files. Verify the homepage, routes, assets, forms/API calls, logs, and mobile view before production.

After production succeeds, change one harmless sentence, push it, and confirm that Vercel deploys the update. This proves the maintenance loop.

### 5. Connect a domain

Read `references/domain.md`. If the user has no domain, guide domain search, purchase, and binding instead of stopping to ask them to buy one independently. Offer only Vercel Domains and GoDaddy, compare live availability plus purchase and renewal prices, and provide the official purchase page. The user must complete login, registrant details, payment, terms, and verification.

After purchase, resume the workflow without requiring the user to restate the task. Add the actual domain to the actual Vercel project, read its current DNS requirements, and guide the required DNS change. Verify the apex domain, `www`, chosen redirect, certificate, HTTPS, and DNS status.

### 6. Handoff

Return:

- Local project path
- GitHub repository URL and visibility
- Vercel preview and production URLs
- Custom domain and HTTPS status
- Database/provider status when applicable
- Commands for future edits
- Domain purchase, renewal, DNS, and unresolved cost warnings

## Supported first-version scope

Good fits: personal sites, portfolios, blogs, company/showcase sites, landing pages, event pages, and simple tools or forms.

Escalate instead of promising: complex commerce, payments, real-time chat, video platforms, multi-tenant SaaS, long-running workers, persistent local files, specialized servers, or major migrations.

## Verification checklist

- The original project and Git history are preserved.
- The production build passes with fresh output.
- No real environment file is staged.
- The GitHub repository belongs to the user and has the confirmed visibility.
- Preview and production URLs both load.
- Core navigation, images, forms, APIs, and mobile layout work.
- A push triggers an automatic Vercel redeployment.
- The custom domain resolves over HTTPS.
- The final message distinguishes verified facts from remaining user actions.

## References

- GitHub authentication and safe publishing: `references/github.md`
- Vercel compatibility and deployment: `references/vercel.md`
- Domain purchase, DNS, and binding: `references/domain.md`
- Optional Supabase branch: `references/supabase.md`
- Common failures and recovery: `references/troubleshooting.md`
