import { createLink } from '@tanstack/react-router';
import { Anchor, type AnchorProps } from '@twilio-paste/core/anchor';
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react';

/**
 * Paste's Anchor deliberately refuses `className` and `style` so that styling
 * only comes from the design system, but createLink passes both (and
 * `disabled`) through. They are accepted and dropped here so router links type
 * check; as a consequence `activeProps`/`inactiveProps` styling will not apply
 * to AppLink.
 */
interface StyledAnchorProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'children' | 'className' | 'href' | 'style' | 'tabIndex' | 'target'
> {
  children: NonNullable<ReactNode>;
  className?: string;
  disabled?: boolean;
  href?: string;
  style?: CSSProperties;
  tabIndex?: AnchorProps['tabIndex'];
  target?: AnchorProps['target'];
}

const StyledAnchor = forwardRef<HTMLAnchorElement, StyledAnchorProps>(function StyledAnchor(
  {
    children,
    className: _className,
    disabled: _disabled,
    href,
    style: _style,
    tabIndex,
    target,
    ...props
  },
  ref,
): ReactElement {
  return (
    <Anchor
      {...props}
      // createLink always supplies href; Paste types it as required.
      href={href ?? ''}
      ref={ref}
      tabIndex={tabIndex}
      target={target}
      variant="inverse"
    >
      {children}
    </Anchor>
  );
});

export const AppLink = createLink(StyledAnchor);
