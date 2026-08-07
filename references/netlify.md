# Netlify deployment

Use this workflow for every deployment. A local CLI link is useful, but it does not replace linking the GitHub repository for continuous deployment.

## 1. Confirm compatibility and build output

Inspect the existing framework and its official Netlify support before changing configuration. Use the project's lockfile and documented build command. Identify the real publish directory from fresh build output; common examples include `dist`, `build`, and framework-managed output.

If deployment would require a framework migration, persistent local disk, a long-running process, or another architectural change, explain the blocker and obtain confirmation before editing.

## 2. Authenticate without exposing credentials

Prefer this ephemeral command when a global CLI is unavailable:

```bash
npm exec --yes --package=netlify-cli@latest -- netlify status
npm exec --yes --package=netlify-cli@latest -- netlify login
```

The user completes browser sign-in and account selection. Never ask them to paste an access token into chat. Netlify stores local project linkage under `.netlify`; keep that directory out of Git.

## 3. Link repository for continuous deployment

In Netlify, choose **Add new project**, **Import an existing project**, and GitHub. Select the exact repository and production branch confirmed with the user. Review the base directory, build command, publish directory, and required environment-variable names before saving.

If the Netlify project already exists, open **Project configuration** and **Build & deploy**, then Link repository to the intended GitHub repository. Confirm that the repository and branch shown by Netlify match `git remote -v` and the intended production branch.

For local CLI work, link the directory to the selected project and recheck status:

```bash
npm exec --yes --package=netlify-cli@latest -- netlify link
npm exec --yes --package=netlify-cli@latest -- netlify status
```

Do not report continuous deployment as configured merely because `.netlify` exists locally. The Netlify project must show the connected Git repository and branch.

## 4. Build and create a preview deployment

Run the production build locally. Then create a preview deployment from the fresh publish directory:

```bash
npm exec --yes --package=netlify-cli@latest -- netlify deploy --dir=<publish-directory>
```

Verify the returned preview URL, main routes, direct route refresh, assets, forms or API calls, browser console, function logs when applicable, and mobile layout. Configure secrets in Netlify's environment-variable settings, never in committed files.

## 5. Confirm production and deploy

Show the verified preview result and ask the user to confirm production. Only then run:

```bash
npm exec --yes --package=netlify-cli@latest -- netlify deploy --prod --dir=<publish-directory>
```

Verify the production URL and HTTPS independently. Confirm the default `<site-name>.netlify.app` address before considering a custom domain.

## 6. Prove the maintenance loop

Confirm that Netlify shows continuous deployment from the intended GitHub repository and branch. When the user later makes and approves a real change, push it and observe the Netlify build reaching a successful published state. Do not create a meaningless commit merely to demonstrate automation.

Official references: [link a repository](https://docs.netlify.com/configure-builds/repo-permissions-linking/), [Netlify CLI](https://docs.netlify.com/api-and-cli-guides/cli-guides/get-started-with-cli/), [create deploys](https://docs.netlify.com/deploy/create-deploys/).
