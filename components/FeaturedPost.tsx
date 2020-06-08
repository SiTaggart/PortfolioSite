import * as React from 'react';
import { Box, Text, Anchor } from '@twilio-paste/core';
import Link from 'next/link';

interface FeaturedPostProps {
  post: {
    title: string;
    description: string;
    date: string;
    __resourcePath: string;
  };
}
export const FeaturePost: React.FC<FeaturedPostProps> = ({ post }) => {
  return (
    <Box
      borderColor="colorBorder"
      borderRadius="borderRadius30"
      borderStyle="solid"
      borderWidth="borderWidth20"
      padding="space40"
    >
      <Text as="h2" fontSize="fontSize50" fontWeight="fontWeightNormal" lineHeight="lineHeight50">
        <Link href={`/${post.__resourcePath.replace('index.mdx', '')}`}>
          <Anchor href={`/${post.__resourcePath.replace('index.mdx', '')}`}>{post.title}</Anchor>
        </Link>
      </Text>
      <Text
        as="p"
        color="colorTextWeak"
        fontSize="fontSize30"
        lineHeight="lineHeight30"
        marginBottom="space20"
      >
        {new Date(post.date).toDateString()}
      </Text>
      <Text as="p" fontSize="fontSize30" lineHeight="lineHeight30">
        {post.description}
      </Text>
    </Box>
  );
};
