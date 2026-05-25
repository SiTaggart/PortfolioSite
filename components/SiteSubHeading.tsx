import { Text } from '@twilio-paste/core/text';
import type React from 'react';

export function SiteSubHeading(props: React.PropsWithChildren): React.ReactElement {
  return (
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
}
