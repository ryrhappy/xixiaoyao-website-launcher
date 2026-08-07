# Netlify address and existing custom domain

The deployment must not depend on the user having a custom domain. Ask only whether they already own one and want to use it.

## No custom domain

Do not start a domain-purchase workflow. Keep the default `<site-name>.netlify.app` address and verify that it loads over HTTPS. If the generated site name is hard to read, offer to rename the Netlify project to an available, readable name before handoff.

## Existing custom domain

Only enter this branch when the user confirms that the domain is already theirs and asks to connect it.

1. Open the actual Netlify project.
2. Go to **Domain management**.
3. Choose **Add a domain** and then **Add a domain you already own**.
4. Enter the exact domain and confirm the project selected by Netlify.
5. Choose whether the apex name or `www` should be primary.
6. Follow the current DNS records displayed by Netlify at the DNS service that already manages the domain.

Never copy fixed record values from an old tutorial. Preserve MX, email verification, and unrelated records. Before replacing a conflicting website record, explain what currently uses it and obtain confirmation.

## Verify the observed result

Netlify may temporarily show **Pending DNS verification** while records update. Report that state as pending rather than complete.

Verify:

- the chosen primary name opens the production site
- the secondary name redirects as intended when configured
- Netlify reports the domain as configured
- HTTPS works without a certificate warning
- existing email-related records remain intact

Useful checks:

```bash
dig +short example.com
dig +short www.example.com
curl -I https://example.com
curl -I https://www.example.com
```

Official references: [Netlify default subdomain](https://docs.netlify.com/manage/domains/domains-fundamentals/understand-domains/), [assign a domain to a project](https://docs.netlify.com/manage/domains/manage-domains/assign-a-domain-to-your-site-app/), [external DNS](https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/).
