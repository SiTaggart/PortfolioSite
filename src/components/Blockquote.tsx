import { Box } from '@twilio-paste/core/box';
import type React from 'react';

export function Blockquote({ children }: React.PropsWithChildren): React.ReactElement {
  return (
    <Box
      as="blockquote"
      borderLeftColor="colorBorderPrimary"
      borderLeftStyle="solid"
      borderLeftWidth="borderWidth20"
      fontStyle="italic"
      paddingLeft="space60"
    >
      {children}
    </Box>
  );
}
