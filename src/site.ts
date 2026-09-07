import { createIsomorphicFn } from '@tanstack/react-start';
import { getRequestHost, getRequestProtocol } from '@tanstack/react-start/server';

import { type Site, resolveSite } from './seo';

export const currentSite = createIsomorphicFn()
  .client((): Site =>
    resolveSite(globalThis.location.protocol.slice(0, -1), globalThis.location.host),
  )
  .server((): Site => resolveSite(getRequestProtocol(), getRequestHost()));
