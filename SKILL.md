---
name: xixiaoyao-website-launcher
description: Use when a non-technical user wants to create or deploy a website, publish it through GitHub and Netlify, use a free Netlify address, or connect a custom domain they already own.
---

# 夕小瑶 AI 网站上线助手

## Overview

This is a deployment-first guide. Its main job is to take a website project through local verification, GitHub, Netlify, and an optional custom domain the user already owns. If a project already exists, deploy it as-is. Only when no project exists, create one from the fixed versioned starter and then return to the same deployment workflow.

Stop at every account, secret, public-repository, production, and DNS boundary that requires the user's action or confirmation.

## Non-negotiable rules

- Ask one short question at a time. Translate Git, CLI, DNS, build, repository, and environment variable into plain language on first use.
- Inspect before changing. Never replace an existing project's framework with the starter.
- Never delete `.git`, overwrite a non-empty directory, force-push, or discard uncommitted work.
- Never request passwords, access tokens, API keys, database passwords, or cookies in chat.
- Never commit `.env*` except `.env.example`. Run `scripts/verify-project.mjs` before staging.
- Use Netlify for every deployment handled by this Skill.
- Do not start a domain-acquisition flow. If the user has no domain, keep the free Netlify address.
- Do not promise that every website is compatible with Netlify. Explain the concrete blocker when adaptation would materially change the architecture.
- Build and preview locally before GitHub; verify a preview deployment before production; verify production before connecting a custom domain.

## Route first

Resolve the project directory and inspect it before asking broad website questions. Use the inspection result, not the user's technical vocabulary.

### Existing project

If the directory contains a project, say clearly that it will be deployed as-is. Keep its framework, package manager, Git history, lockfile, configuration, and unrelated changes. Identify its build command, publish directory, and Netlify compatibility, then enter the shared deployment workflow.

Do not ask about pages, style, content, or a database unless the user also asks to change the website or deployment is blocked. Ask only for information required to deploy, such as the project path, missing environment-variable names, GitHub visibility, Netlify account action, or whether the user already owns a custom domain.

### New project

If the user has no project, explain that the Skill will first create the smallest usable project and then deploy it. Ask only for the minimum information needed to replace the starter content: project name, website purpose, essential page or action, and any real text or images already available.

Confirm an absent or empty absolute directory, then run:

```bash
node <skill-dir>/scripts/download-template.mjs "<new-empty-directory>"
```

The default source is the tested `v1.0.0` tag of `ryrhappy/xixiaoyao-nextjs-starter`. Do not download `main`. If the tag cannot be fetched, explain the failure and offer `create-next-app` as a fallback. Retain the starter's Next.js, React, TypeScript, App Router, Tailwind CSS, responsive, metadata, and 404 foundations. Replace only the generic content needed for the user's first usable version, then immediately continue with the shared deployment workflow.

For new features that require login, saved forms, comments, uploads, collections, or an admin panel, recommend Supabase and read `references/supabase.md`. Do not introduce a database for a static site or simple deployment. A simple contact form may use Netlify Forms or an email service instead.

## Shared deployment workflow

### 1. Check the environment and project

Run:

```bash
node <skill-dir>/scripts/check-environment.mjs
node <skill-dir>/scripts/inspect-project.mjs "<project-directory>"
```

GitHub CLI is needed when creating or pushing a repository. If a global Netlify CLI is absent, run it without a global installation:

```bash
npm exec --yes --package=netlify-cli@latest -- netlify <command>
```

Node.js and npm are required for the default starter; for an existing project, respect its detected runtime and package manager. If a required tool is missing, explain what it is and give the official installation path for the user's operating system. Resume only after rechecking.

### 2. Verify locally

1. Install with the detected package manager and existing lockfile.
2. Run lint, typecheck, tests, and production build when scripts exist.
3. Start the documented local preview command.
4. For a newly created or intentionally modified site, ask the user to approve content, appearance, mobile layout, and public contact details.
5. Fix errors before continuing. Never treat a successful install as a successful build.

### 3. Publish to GitHub

Read `references/github.md`. Before creating an external repository, confirm the repository name and public/private visibility. Preserve existing remotes and history. Show `git status` and run:

```bash
node <skill-dir>/scripts/verify-project.mjs "<project-directory>"
```

Review every flagged file. A clean result permits review and staging; it does not prove that file contents are secret-free. Inspect the staged diff before commit and push.

### 4. Deploy to Netlify

Read `references/netlify.md`. Sign in to the user's Netlify account, then Link repository to connect the confirmed GitHub repository and production branch. Confirm the detected build command and publish directory. This Git connection must enable continuous deployment so later pushes can publish automatically.

Create a preview deployment first:

```bash
npm exec --yes --package=netlify-cli@latest -- netlify deploy --dir=<publish-directory>
```

Verify the preview URL, homepage, routes, assets, forms or API calls, logs, and mobile view. Show the result and explicitly ask the user to confirm production. Only after confirmation, create the production deployment:

```bash
npm exec --yes --package=netlify-cli@latest -- netlify deploy --prod --dir=<publish-directory>
```

Store production environment variables in Netlify, not source files. After production succeeds, verify the configured GitHub connection and observe a later real push triggering a Netlify build. Do not make a meaningless content edit solely to create a test commit.

### 5. Choose the public address

Read `references/domain.md`.

- If the user does not own a custom domain, use the free `<site-name>.netlify.app` address and finish the deployment. Do not introduce a paid-domain workflow.
- If the user already owns a custom domain and asks to use it, add that domain to the actual Netlify project, follow the live DNS instructions shown for it, and verify the apex name, `www` choice, redirect, certificate, and HTTPS.

### 6. Handoff

Return:

- Local project path
- GitHub repository URL, visibility, and production branch
- Netlify preview and production URLs
- Git continuous deployment status
- Free Netlify address or existing custom-domain and HTTPS status
- Database/provider status when applicable
- Commands for future edits and deployments
- Remaining user actions or unresolved warnings

## Supported first-version scope

Good fits: personal sites, portfolios, blogs, company/showcase sites, landing pages, event pages, and simple tools or forms.

Escalate instead of promising: complex commerce, payments, real-time chat, video platforms, multi-tenant SaaS, long-running workers, persistent local files, specialized servers, or major migrations.

## Verification checklist

- The original project and Git history are preserved.
- The production build passes with fresh output.
- No real environment file or `.netlify` state is staged.
- The GitHub repository belongs to the user and has the confirmed visibility.
- Preview and production URLs both load.
- Core navigation, images, forms, APIs, and mobile layout work.
- The Netlify project is linked to the intended GitHub repository and branch.
- Continuous deployment is enabled and a later real push is observed when available.
- The free Netlify address works, or the user's existing custom domain resolves over HTTPS.
- The final message distinguishes verified facts from remaining user actions.

## References

- GitHub authentication and safe publishing: `references/github.md`
- Netlify compatibility, repository linking, and deployment: `references/netlify.md`
- Free address and existing custom-domain binding: `references/domain.md`
- Optional Supabase branch: `references/supabase.md`
- Common failures and recovery: `references/troubleshooting.md`
