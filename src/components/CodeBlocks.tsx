import { Box } from '@twilio-paste/core/box';
import { Text } from '@twilio-paste/core/text';
import type React from 'react';

export function CodeBlock(
  props: React.PropsWithChildren<Record<string, unknown>>,
): React.ReactElement {
  return (
    <Box
      as="pre"
      borderRadius="borderRadius20"
      marginBottom="space120"
      marginTop="space120"
      overflow="auto"
      padding="space40"
      {...props}
    />
  );
}

export function InlineCode({
  children,
  ...props
}: React.PropsWithChildren<Record<string, unknown>>): React.ReactElement {
  return (
    <Box as="code" backgroundColor="colorBackground" display="inline" padding="space10" {...props}>
      <Text as="span" color="colorTextWeak" fontFamily="fontFamilyCode">
        {children}
      </Text>
    </Box>
  );
}

/**
 * MDX maps every `code` element to one component, but rehype-prism-plus emits
 * fenced blocks as `<pre><code class="language-*">`. Those are already styled
 * by the Prism globals, so giving them the inline treatment nests a second
 * padded, inline-displayed background box inside the `pre` and overrides the
 * syntax theme's base text colour.
 */
export function Code({
  children,
  ...props
}: React.PropsWithChildren<Record<string, unknown>>): React.ReactElement {
  const className = typeof props.className === 'string' ? props.className : undefined;

  if (className?.includes('language-')) {
    return <code {...props}>{children}</code>;
  }

  return <InlineCode {...props}>{children}</InlineCode>;
}
