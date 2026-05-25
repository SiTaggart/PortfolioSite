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
