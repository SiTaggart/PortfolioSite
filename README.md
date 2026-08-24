# Portfolio site for Simon Taggart

A text-first resume and portfolio. Built with Bun, React 19, TanStack Start,
Vite and Tailwind CSS v4. Deployed to Cloudflare Workers. Linted and formatted
with oxlint and oxfmt, type-checked with tsgo.

## Routes

| Route          | Content                                                   |
| -------------- | --------------------------------------------------------- |
| `/`            | Hero, selected work, experience, about and contact        |
| `/work/paste`  | Paste and Twilio product unification case study           |
| `/robots.txt`  | Server route: allows crawling on the production host only |
| `/sitemap.xml` | Server route: the case studies plus the front page        |

Metadata, canonical URLs, `robots.txt` and `sitemap.xml` are all environment
aware, so preview deployments never advertise themselves or point at
production. See `src/seo.ts` and `src/site.ts`.

## Content

Copy lives in `src/content/` as typed data and the components in
`src/components/resume/` render it.

- `resume.ts` — hero, experience, about and contact.
- `work/*.ts` — case studies, rendered by `CaseStudyPage`.

## Installing

```sh
bun install
```

## Development

```sh
bun run dev
```

## Verification

```sh
bun run check
```

`check` is type-checking, linting and formatting, and is all CI runs. The
Cloudflare preview deployment builds every pull request, so a broken build or an
invalid Worker config shows up there rather than being duplicated here.

## Cloudflare Workers

The Worker config lives in `wrangler.jsonc` and uses TanStack Start's Cloudflare
entrypoint. Run `bun run cf-typegen` after bindings or environment variables
change, then `bun run deploy`.
