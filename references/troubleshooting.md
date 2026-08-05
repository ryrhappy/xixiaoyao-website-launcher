# Troubleshooting

| Symptom | Check first | Safe response |
|---|---|---|
| Command not found | Environment report | Install from the official source, then recheck |
| Target directory not empty | Project inspection | Treat it as existing; never overwrite it |
| Local build fails | First error in complete build output | Fix locally before GitHub or Vercel |
| Works locally, fails on Vercel | Node version, root, env, build/output settings | Reproduce with the same production build |
| Route refresh returns 404 | SPA rewrites or framework preset | Add the smallest supported routing config |
| Images or fonts disappear | Absolute local paths or blocked remote host | Bundle critical assets with the project |
| Supabase works locally only | Vercel env scope and redirect URLs | Add correct Preview/Production values and redeploy |
| Domain says invalid configuration | Actual authoritative DNS and conflicting records | Use `domains inspect`; change records at the real DNS host |
| HTTPS pending | DNS resolution and conflicting CAA/old records | Wait for propagation only after records are verified |
| Git push rejected | Remote history and branch | Stop; do not force-push or overwrite remote work |

When an adaptation changes persistence, authentication, cost, public visibility, domain routing, or architecture, explain the impact and obtain confirmation before editing.
