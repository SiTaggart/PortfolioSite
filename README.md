# Portfolio site for Simon Taggart

A single-page, text-first resume. Built with Bun, React 19, TanStack Start,
Vite and Tailwind CSS v4 (shadcn-ready). Deployed to Cloudflare Workers. Linted
and formatted with oxlint and oxfmt, type-checked with tsgo.

All copy lives in `src/content/resume.ts` as typed data; the components in
`src/components/resume/` render it.

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
bun run build
bun run smoke
bun run cypress:ci
bunx wrangler deploy --dry-run
```

## Cloudflare Workers

The Worker config lives in `wrangler.jsonc` and uses TanStack Start's Cloudflare
entrypoint. Run `bun run cf-typegen` after bindings or environment variables
change, then `bun run deploy`.
