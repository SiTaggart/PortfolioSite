import * as React from 'react';
import { css } from '@styled-system/css';
import { Box } from '@twilio-paste/core';

export const Table: React.FC<{}> = (props) => (
  <Box
    as="table"
    css={css({ borderCollapse: 'collapse', tableLayout: 'fixed' })}
    marginBottom="space120"
    marginTop="space120"
    width="100%"
    {...props}
  />
);
export const Thead: React.FC<{}> = (props) => <Box as="thead" {...props} />;
export const Tbody: React.FC<{}> = (props) => (
  <Box
    as="tbody"
    borderColor="colorBorderLight"
    borderRadius="borderRadius20"
    borderStyle="solid"
    borderWidth="borderWidth20"
    {...props}
  />
);
export const Tfoot: React.FC<{}> = (props) => <Box as="tbody" {...props} />;
export const Tr: React.FC<{}> = (props) => (
  <Box
    _odd={{ backgroundColor: 'colorBackgroundBody' }}
    as="tr"
    backgroundColor="colorBackground"
    {...props}
  />
);
export const Th: React.FC<{}> = (props) => (
  <Box
    as="th"
    css={css({ fontWeight: 'fontWeightSemibold', textAlign: 'left' })}
    padding="space10"
    paddingLeft="space20"
    paddingRight="space20"
    {...props}
  />
);
export const Td: React.FC<{}> = (props) => (
  <Box as="td" padding="space10" paddingLeft="space20" paddingRight="space20" {...props} />
);
