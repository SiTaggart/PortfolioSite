import * as React from 'react';
import { Text } from '@twilio-paste/core';

const Posts: React.FC = () => {
  return (
    <>
      <Text
        as="h1"
        fontSize="fontSize110"
        fontWeight="fontWeightSemibold"
        letterSpacing="-2px"
        lineHeight="lineHeight110"
        marginBottom="space70"
      >
        Simon <br /> Taggart foo
      </Text>
      <Text
        as="p"
        color="colorTextWeak"
        fontSize="fontSize90"
        lineHeight="lineHeight90"
        marginBottom="space70"
      >
        UX Engineering &amp; Accessibility
      </Text>
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default Posts;
