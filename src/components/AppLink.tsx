import { createLink } from '@tanstack/react-router';
import { Anchor, type AnchorProps } from '@twilio-paste/core/anchor';
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react';

interface StyledAnchorProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'children' | 'className' | 'style' | 'tabIndex' | 'target'
> {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  style?: CSSProperties;
  tabIndex?: AnchorProps['tabIndex'];
  target?: AnchorProps['target'];
}

const StyledAnchor = forwardRef<HTMLAnchorElement, StyledAnchorProps>(function StyledAnchor(
  {
    children,
    className: _className,
    disabled: _disabled,
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
      href={props.href ?? ''}
      ref={ref}
      tabIndex={tabIndex}
      target={target}
      variant="inverse"
    >
      {children ?? ''}
    </Anchor>
  );
});

export const AppLink = createLink(StyledAnchor);
