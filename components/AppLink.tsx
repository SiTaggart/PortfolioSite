import {
  createElement,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react';

type AppLinkTarget = '/' | '/posts' | '/posts/$slug';

type AppLinkProps = {
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement> &
  (
    | {
        params?: never;
        to: Exclude<AppLinkTarget, '/posts/$slug'>;
      }
    | {
        params: {
          slug: string;
        };
        to: '/posts/$slug';
      }
  );

function hrefForRoute(to: AppLinkTarget, params?: { slug: string }): string {
  if (to === '/posts/$slug') {
    return `/posts/${encodeURIComponent(params?.slug ?? '')}`;
  }

  return to;
}

export function AppLink({ params, to, ...props }: AppLinkProps): ReactElement {
  const href = hrefForRoute(to, params);
  const style = {
    color: '#fffffe',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    textDecoration: 'underline',
    ...props.style,
  };

  function handleClick(event: MouseEvent<HTMLAnchorElement>): void {
    props.onClick?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey
    ) {
      return;
    }

    event.preventDefault();
    window.location.assign(href);
  }

  return createElement('a', {
    ...props,
    href,
    onClick: handleClick,
    style,
  });
}
