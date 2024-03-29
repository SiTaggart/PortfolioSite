import type React from 'react';
import { Text } from '@twilio-paste/core/text';

export const SiteMainHeading: React.FC<React.PropsWithChildren> = (props) => (
  <Text
    as="h1"
    color="colorTextWeak"
    fontSize={['fontSize80', 'fontSize110']}
    fontWeight="fontWeightBold"
    letterSpacing="-1px"
    lineHeight={['lineHeight80', 'lineHeight100']}
    marginBottom="space30"
    {...props}
  />
);
