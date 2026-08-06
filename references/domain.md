# Domain purchase and binding

Complete this workflow even when the user starts without a domain. Do not stop at “buy a domain and come back.” Ask one short question at a time and retain the Vercel project already identified earlier in the conversation.

## 1. Determine the starting point

- Already owns a domain: ask for the exact domain and where it was purchased, then continue at binding.
- Has no domain: ask for the desired name or keyword and preferred suffix. If the user has no suffix preference, check `.com` first and offer nearby available alternatives.

## 2. Search availability and current prices

Use current results; never quote a stored price. Prefer a recent Vercel CLI with domain search support:

```bash
vercel domains search <keyword> --available --limit 10
vercel domains search <keyword> --tld com --available
vercel domains price <exact-domain>
```

If `domains search` is unavailable, update the CLI or use the official purchase pages. Present 3–5 readable candidates and show, when available:

- exact domain
- availability at the time checked
- first registration charge and term
- renewal charge and term
- currency, tax, premium-domain, and WHOIS-privacy notes

Offer only these purchase routes:

- [Vercel Domains](https://vercel.com/domains): simplest for a Vercel site because Vercel configures its nameservers and renewals.
- [GoDaddy domain search](https://www.godaddy.com/domains/domain-name-search): third-party purchase; DNS remains in GoDaddy unless the user later changes nameservers.

Do not imply that availability or price is reserved until checkout succeeds.

## 3. Purchase and account boundary

Ask the user to choose the exact domain and purchase route. Before checkout, repeat the exact domain, observed first charge, observed renewal charge, and auto-renewal state.

The user must personally:

- sign in or create the registrar account
- provide registrant/contact details
- accept registration terms
- complete CAPTCHA, email verification, two-factor authentication, and payment
- confirm the final checkout total and auto-renewal setting

Never request credentials, payment details, verification codes, or registrant identity in chat. Do not run `vercel domains buy` or approve another paid action for the user. Provide the official purchase link and wait for the user to confirm that the domain now appears in their account.

Resume immediately after the user confirms ownership. Do not ask them to repeat the Vercel project or the deployment request.

## 4. Bind the purchased or existing domain

Confirm which address is primary: `example.com` or `www.example.com`. Add both to the actual project:

```bash
vercel domains add example.com <project>
vercel domains add www.example.com <project>
vercel domains inspect example.com
vercel domains inspect www.example.com
```

Use the records returned for this project at this moment. Never copy fixed A or CNAME values from an old tutorial.

### Vercel Domains

Vercel normally configures nameservers for domains bought through Vercel. Inspect both names, attach them to the project, select the primary address in Project Settings, and configure the other to redirect to it. Do not create duplicate records when Vercel already manages them.

### GoDaddy

Keep the user's GoDaddy DNS zone unless they explicitly choose to change nameservers. Show the exact host, record type, value, and any record that must be removed. Guide the user through GoDaddy's DNS management page; the user completes login, two-factor authentication, and the final save. Vercel CLI cannot change a GoDaddy-hosted DNS zone.

Before replacing an existing record, explain what currently uses it. Do not remove MX or email-verification records while connecting a website.

## 5. Verify and continue checking

Check observed state instead of declaring success from a saved form:

```bash
vercel domains inspect example.com
vercel domains inspect www.example.com
dig +short example.com
dig +short www.example.com
curl -I https://example.com
curl -I https://www.example.com
```

Verify:

- apex and `www` both resolve
- the selected primary domain serves the production deployment
- the secondary address redirects to the primary address
- Vercel reports valid configuration
- HTTPS certificates work for both names
- existing email-related DNS records remain intact

DNS propagation may take time. If it is pending, report the current result and the next check; do not claim completion prematurely.

Official references: [Vercel domain CLI](https://vercel.com/docs/cli/domains), [working with Vercel domains](https://vercel.com/docs/domains/working-with-domains), [Vercel DNS CLI](https://vercel.com/docs/cli/dns), [GoDaddy domain search](https://www.godaddy.com/domains/domain-name-search).
