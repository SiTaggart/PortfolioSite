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

## Verification

```sh
bun run build
bun run lint
bun run prettier
bun run smoke
bunx wrangler deploy --dry-run
```

## Cloudflare Workers

The Worker config lives in `wrangler.jsonc` and uses TanStack Start's Cloudflare entrypoint.

Before the first real deploy, configure Cloudflare for this repository:

1. Create or choose the Cloudflare Workers project named `portfolio-site`.
2. Authenticate Wrangler locally or in CI with a scoped Cloudflare API token.
3. Confirm the target account and custom domain route for `www.simontaggart.com`.
4. Run `bun run cf-typegen` after bindings or environment variables are added.
5. Deploy with `bun run deploy`.
