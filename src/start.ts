import { createCsrfMiddleware, createMiddleware, createStart } from '@tanstack/react-start';

// public/_headers only covers responses served from the assets directory, so it
// reaches the fonts, images and hashed bundles but never the rendered HTML,
// which the Worker generates. These are the headers for everything the Worker
// answers itself.
const securityHeaders = createMiddleware({ type: 'request' }).server(async ({ next }) => {
  const result = await next();

  result.response.headers.set('X-Content-Type-Options', 'nosniff');
  result.response.headers.set('X-Frame-Options', 'DENY');
  result.response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  result.response.headers.set(
    'Permissions-Policy',
    'accelerometer=(), camera=(), geolocation=(), gyroscope=(), microphone=(), payment=(), usb=()',
  );

  return result;
});

// Start applies its own CSRF middleware only while no start instance exists, so
// declaring one means opting back in explicitly.
const csrfMiddleware = createCsrfMiddleware({ filter: (ctx) => ctx.handlerType === 'serverFn' });

export const startInstance = createStart(() => ({
  requestMiddleware: [csrfMiddleware, securityHeaders],
}));
