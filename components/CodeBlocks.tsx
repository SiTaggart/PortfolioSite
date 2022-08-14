import type React from 'react';
import { Box } from '@twilio-paste/core/box';
import { Text } from '@twilio-paste/core/text';

export const CodeBlock: React.FC = (props) => (
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

export const InlineCode: React.FC = ({ children, ...props }) => (
  <Box as="code" backgroundColor="colorBackground" display="inline" padding="space10" {...props}>
    <Text as="span" color="colorTextWeak" fontFamily="fontFamilyCode">
      {children}
    </Text>
  </Box>
);
