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
| `/sitemap.xml` | Server route: the front page plus the case studies        |

Metadata, canonical URLs, `robots.txt`, `sitemap.xml` and the analytics beacon
are all environment aware, so preview deployments never advertise themselves,
point at production, or report into its analytics. See `src/seo.ts` and
`src/site.ts`.

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

To exercise the production branch of the host-dependent metadata locally, build,
serve, and send the production host:

```sh
bun run build && bun run preview
curl -sH 'Host: www.simontaggart.com' http://localhost:4173/robots.txt
```

`vite.config.ts` allows that host in `preview.allowedHosts`.

## Cloudflare Workers

The Worker config lives in `wrangler.jsonc` and uses TanStack Start's Cloudflare
entrypoint. Run `bun run cf-typegen` after bindings or environment variables
change, then `bun run deploy`.

Response headers are set in two places, because `public/_headers` only applies
to responses served from the assets directory. Asset caching belongs there;
headers for the rendered pages go in the request middleware in `src/start.ts`,
which also re-registers Start's CSRF middleware since declaring a start instance
opts out of the built-in one.
