# Optional Supabase branch

Use Supabase only when the approved requirements need persistent data, authentication, uploads, comments, collections, or an admin workflow.

## Explain before setup

Tell the user that Supabase is a separate service with its own account, region, limits, and possible charges. Ask them to create or select the project; do not ask for credentials in chat.

## Security boundary

- Enable Row Level Security for user-facing tables.
- Use the browser-safe publishable/anon key only with correct policies.
- Keep `service_role`, database password, and OAuth secrets server-side.
- Never prefix a server secret with `NEXT_PUBLIC_`.
- Store local values in `.env.local`, production values in Vercel, and placeholders in `.env.example`.
- Use separate Preview and Production projects or data when preview writes would be risky.

## Integration order

1. Define the smallest required data model.
2. Define who may read and write each row.
3. Create policies and constraints before exposing forms.
4. Add the application client and server integration.
5. Configure local and Vercel environment variables.
6. Test unauthenticated access and cross-user isolation.
7. Configure OAuth redirect URLs only when social login is requested.

Do not add `service_role` for ordinary user forms when a session plus Row Level Security is sufficient.

Official references: [Supabase Next.js guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs), [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security).
