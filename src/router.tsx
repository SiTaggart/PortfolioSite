import { createRouter as createTanStackRouter } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';

type AppRouter = ReturnType<typeof createTanStackRouter<typeof routeTree>>;

export function getRouter(): AppRouter {
  return createTanStackRouter({ routeTree });
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
