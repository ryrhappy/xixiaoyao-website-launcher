---
name: xixiaoyao-website-launcher
description: Use when a non-technical user wants to create a website, continue an existing website project, publish code to GitHub, deploy to Vercel, connect a custom domain, or decide whether Supabase is needed.
---

# 夕小瑶 AI 网站上线助手

## Overview

Guide a non-technical user from an idea or existing project to a verified website. Preserve existing work, use the fixed versioned starter only for new projects, and stop at every account, payment, secret, public-repository, production, and DNS boundary that requires the user's action or confirmation.

## Non-negotiable rules

- Ask one short question at a time. Translate Git, CLI, DNS, build, repository, and environment variable into plain language on first use.
- Inspect before changing. Never replace an existing project's framework with the starter.
- Never delete `.git`, overwrite a non-empty directory, force-push, or discard uncommitted work.
- Never request passwords, access tokens, API keys, database passwords, or cookies in chat.
- Never commit `.env*` except `.env.example`. Run `scripts/verify-project.mjs` before staging.
- Do not buy a domain, accept terms, solve a CAPTCHA, or approve a paid operation for the user.
- Do not claim that Vercel guarantees reliable access from mainland China.
- Do not promise that every website is compatible with Vercel. Explain the concrete blocker and recommend another host when adaptation would materially change the architecture.
- Build and preview locally before GitHub; verify a preview deployment before production; verify production before connecting a domain.

## Workflow

### 1. Check the environment

Run:

```bash
node <skill-dir>/scripts/check-environment.mjs
node <skill-dir>/scripts/inspect-project.mjs "<project-directory>"
```

Git, Node.js, and npm are required for the default new-project path. GitHub CLI is needed when creating or pushing a repository. Use `npx vercel` when a global Vercel CLI is absent.

If a required tool is missing, explain what it is and give the official installation path for the user's operating system. Resume only after rechecking.

### 2. Choose new or existing project

Use the inspection result, not the user's technical vocabulary.

**New project:** The target directory is absent or empty. Confirm its absolute location and name, then run:

```bash
node <skill-dir>/scripts/download-template.mjs "<new-empty-directory>"
```

The default source is the tested `v1.0.0` tag of `ryrhappy/xixiaoyao-nextjs-starter`. Do not download `main`. If the tag cannot be fetched, explain the failure and offer `create-next-app` as a fallback.

**Existing project:** Keep its framework, package manager, Git history, lockfile, and unrelated changes. Identify the current build command and run it before proposing Vercel changes. Show the user any required compatibility edit before applying it.

### 3. Clarify the website

Ask only what changes the implementation:

1. What is the website for, and who should use it?
2. Which pages and actions are essential?
3. What real text, images, links, and identity details are available?
4. Does the visitor need to sign in or submit information that must be saved?
5. Is there already a domain?

Do not invent biography, clients, results, testimonials, prices, or personal testing. Use clearly labeled placeholders when material is missing.

### 4. Decide whether a database is needed

Do not ask “Do you need a database?” first. Ask whether visitors need login, saved forms, comments, uploads, collections, or an admin panel.

- No persistent data: continue without a database.
- Persistent data: recommend Supabase and read `references/supabase.md` before changing the project.
- Simple email contact: explain that a full database may be unnecessary and offer a form/email service instead.

### 5. Implement and verify locally

For a new project, retain the starter's Next.js, React, TypeScript, App Router, Tailwind CSS, local/system-font, responsive, metadata, and 404 foundations. Replace its generic content according to the approved brief.

For any project:

1. Install with the detected package manager and existing lockfile.
2. Run lint, typecheck, tests, and production build when scripts exist.
3. Start the documented preview command.
4. Ask the user to approve content, appearance, mobile layout, and public contact details.
5. Fix errors before continuing. Never treat a successful install as a successful build.

### 6. Publish to GitHub

Read `references/github.md`. Before creating an external repository, confirm the repository name and public/private visibility. Preserve existing remotes and history. Show `git status` and run:

```bash
node <skill-dir>/scripts/verify-project.mjs "<project-directory>"
```

Review every flagged file. A clean result permits review and staging; it does not prove that file contents are secret-free. Inspect the staged diff before commit and push.

### 7. Deploy to Vercel

Read `references/vercel.md`. Prefer Git-connected deployment so future pushes redeploy automatically. Use a preview deployment first. Configure environment variables in Vercel, not source files. Verify the homepage, routes, assets, forms/API calls, logs, and mobile view before production.

After production succeeds, change one harmless sentence, push it, and confirm that Vercel deploys the update. This proves the maintenance loop.

### 8. Connect a domain

Read `references/domain.md`. Do not require a particular registrar. Let the user buy or reuse a domain. Read the DNS values shown for the actual Vercel project; do not copy fixed A/CNAME values from an old tutorial.

If Vercel hosts DNS, `vercel dns` may manage records. Otherwise the user must change records at their registrar. Verify apex, `www`, redirects, HTTPS, and DNS status.

### 9. Handoff

Return:

- Local project path
- GitHub repository URL and visibility
- Vercel preview and production URLs
- Custom domain and HTTPS status
- Database/provider status when applicable
- Commands for future edits
- Costs, unresolved warnings, and mainland-China access boundary

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
- Domain choices, DNS, and mainland access: `references/domain.md`
- Optional Supabase branch: `references/supabase.md`
- Common failures and recovery: `references/troubleshooting.md`
