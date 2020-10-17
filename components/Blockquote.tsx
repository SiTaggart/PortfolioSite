import * as React from 'react';
import { Box } from '@twilio-paste/core/box';
import { Text } from '@twilio-paste/core/text';

export const Blockquote: React.FC = ({ children }) => (
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
