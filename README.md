# Portfolio and blog site for Simon Taggart

Site built with Bun, React, TanStack Start, Vite, MDX, and Cloudflare Workers.

## Installing

```sh
bun install
```

## Development

```sh
bun run dev
```

## Layout

Everything the app ships lives under `src/`:

| Path              | Contents                                                      |
| ----------------- | ------------------------------------------------------------- |
| `src/routes/`     | TanStack Start file routes                                    |
| `src/components/` | Shared components, including the MDX component map and layout |
| `src/content/`    | Posts as MDX, plus the loader that indexes them               |
| `src/theme/`      | Paste theme overrides and the Prism syntax theme              |

A post is a directory under `src/content/posts/` containing an `index.mdx`. The
directory name is the URL, and the `meta` export supplies the title, date and
description.

## Verification

```sh
bun run ci:checks          # build, type-check, lint, format and route smoke
bun run cypress:ci         # browser tests
bunx wrangler deploy --dry-run
```

Individual steps are available as `build`, `lint`, `format:check`, `typecheck`
and `smoke`. `bun run check` runs type-check, lint and format in parallel
without building.

## Cloudflare Workers

The Worker config lives in `wrangler.jsonc` and uses TanStack Start's Cloudflare entrypoint.

Before the first real deploy, configure Cloudflare for this repository:

1. Create or choose the Cloudflare Workers project named `portfolio-site`.
2. Authenticate Wrangler locally or in CI with a scoped Cloudflare API token.
3. Confirm the target account and custom domain route for `www.simontaggart.com`.
4. Run `bun run cf-typegen` after bindings or environment variables are added.
5. Deploy with `bun run deploy`.
