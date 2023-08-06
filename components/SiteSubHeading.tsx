import type React from 'react';
import { Text } from '@twilio-paste/core/text';

export const SiteSubHeading: React.FC<React.PropsWithChildren> = (props) => (
  <Text
    as="p"
    color="colorTextBrandHighlight"
    fontSize={['fontSize50', 'fontSize90']}
    fontWeight="fontWeightSemibold"
    lineHeight={['lineHeight60', 'lineHeight90']}
    marginBottom={['space70', 'space140']}
    {...props}
  />
);
