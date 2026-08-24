import { createRouter } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';

type AppRouter = ReturnType<typeof createRouter<typeof routeTree>>;

export function getRouter(): AppRouter {
  return createRouter({
    defaultPreload: 'intent',
    routeTree,
    scrollRestoration: true,
  });
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
