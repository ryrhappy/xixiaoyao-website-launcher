# GitHub publishing

## Before publishing

1. Run `git status --short --branch`.
2. Preserve uncommitted and unrelated user changes.
3. Run the production build and secret-file checker.
4. Confirm repository name and public/private visibility.
5. Inspect the staged diff; do not use `git add -A` in a mixed worktree.

## Authentication

```bash
gh --version
gh auth status
gh auth login
```

The user completes browser authorization. Never request or display their token.

## New repository

After confirmation, initialize Git only when `.git` is absent. Create the repository from the current source and push without importing template history:

```bash
git init -b main
git add <reviewed-files>
git commit -m "Initial website"
gh repo create <name> --private --source . --remote origin --push
```

Replace `--private` with `--public` only after explicit confirmation.

## Existing repository

Do not replace remotes or force-push. Inspect:

```bash
git remote -v
git branch --show-current
git status --short --branch
```

Use a normal commit and push on the current approved branch. If histories conflict or the remote contains work not present locally, stop and explain before pulling or rebasing.

Official references: [GitHub CLI authentication](https://cli.github.com/manual/gh_auth_login), [creating repositories](https://cli.github.com/manual/gh_repo_create).
