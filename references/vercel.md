# Vercel deployment

## Compatibility audit

Vercel commonly recognizes Next.js, React/Vite, Vue, Nuxt, SvelteKit, Astro, and static HTML projects. Recognition does not guarantee compatibility.

Check:

- Package manager and lockfile
- Root directory for monorepos
- Install, build, and output settings
- Required Node.js version
- Environment variables
- Server-side file-system writes, long-running processes, WebSockets, native binaries, and background jobs

Adapt only after explaining material architecture or cost changes. Recommend another host when the application depends on capabilities the selected Vercel runtime cannot safely preserve.

## CLI path

Use global `vercel` when installed; otherwise substitute `npx vercel`:

```bash
vercel login
vercel link
vercel env ls
vercel
vercel --prod
```

The user completes login. Do not accept a token in chat.

## Git-connected path

Prefer connecting the confirmed GitHub repository. A push to the production branch then triggers deployment. Verify Preview before Production.

## Environment variables

Keep real values in Vercel Project Settings or `vercel env add`. Use separate values for Preview and Production when preview traffic must not touch production data.

## Required verification

- Build log has no unresolved error.
- Homepage, nested routes, images, and API/forms work.
- Production uses the intended environment variables.
- A later Git push updates the production site.

Official references: [Vercel CLI](https://vercel.com/docs/cli), [deployments](https://vercel.com/docs/deployments).
