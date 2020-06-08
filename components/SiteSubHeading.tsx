import * as React from 'react';
import { Text } from '@twilio-paste/core';

export const SiteSubHeading: React.FC<{}> = (props) => (
  <Text
    as="p"
    css={{
      color: '#ff5470',
    }}
    fontSize={['fontSize50', 'fontSize90']}
    fontWeight="fontWeightSemibold"
    lineHeight={['lineHeight60', 'lineHeight90']}
    marginBottom={['space70', 'space140']}
    {...props}
  />
);
