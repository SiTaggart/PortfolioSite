import * as React from 'react';
import { Box, Text } from '@twilio-paste/core';

export const Blockquote: React.FC<{}> = ({ children }) => {
  return (
    <Box
      as="blockquote"
      borderLeftColor="colorBorderPrimary"
      borderLeftStyle="solid"
      borderLeftWidth="borderWidth20"
      paddingLeft="space60"
    >
      <Text as="span" fontStyle="italic">
        {children}
      </Text>
    </Box>
  );
};
