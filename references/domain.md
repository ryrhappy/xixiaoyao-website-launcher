# Domain and DNS

## Buying or reusing a domain

Do not prescribe one registrar. The user may use Vercel Domains, GoDaddy, Namecheap, Porkbun, Alibaba Cloud, Tencent Cloud, or another registrar. Explain registration price versus renewal price and let the user complete payment.

Prefer a broadly recognized `.com` for this tutorial. Do not claim that a top-level domain alone guarantees accessibility.

## Binding

Add or inspect the domain:

```bash
vercel domains add example.com <project>
vercel domains inspect example.com
```

Copy the actual records returned for that project. Do not hardcode an A address or CNAME from a blog post.

If the domain uses Vercel nameservers, records can be managed with:

```bash
vercel dns ls example.com
vercel dns add example.com <name> <type> <value>
```

If another provider remains authoritative, change records at that provider. Vercel CLI cannot modify a third party's DNS zone.

## Verification

Check the apex domain, `www`, chosen redirect, certificate, and HTTPS response. DNS propagation can take time; report observed status rather than a guaranteed completion time.

## Mainland China boundary

The default route uses overseas hosting to avoid an ICP filing workflow. A custom domain can reduce reliance on a `.vercel.app` address, but Vercel has no mainland-China infrastructure and does not guarantee availability or performance there. Avoid Google Fonts, GitHub Raw, and blocked third-party resources for critical content.

Official references: [Vercel domains CLI](https://vercel.com/docs/cli/domains), [Vercel DNS CLI](https://vercel.com/docs/cli/dns), [mainland China access](https://vercel.com/kb/guide/accessing-vercel-hosted-sites-from-mainland-china).
