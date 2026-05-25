import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

type AppRouter = ReturnType<typeof createTanStackRouter<typeof routeTree>>;

export function createRouter(): AppRouter {
  return createTanStackRouter({
    defaultPreload: 'intent',
    routeTree,
    scrollRestoration: true,
  });
}

export function getRouter(): AppRouter {
  return createRouter();
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
