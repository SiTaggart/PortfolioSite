import * as React from 'react';
import { Box, Text } from '@twilio-paste/core';

export const CodeBlock: React.FC<{}> = (props) => (
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

export const InlineCode: React.FC<{}> = ({ children, ...props }) => (
  <Box as="code" backgroundColor="colorBackground" display="inline" padding="space10" {...props}>
    <Text as="span" fontFamily="fontFamilyCode">
      {children}
    </Text>
  </Box>
);
