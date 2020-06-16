import * as React from 'react';
import { Text } from '@twilio-paste/core';
import { NextSeo } from 'next-seo';
import { FrontMatterShape } from '../types';

const Post = ({ title, url, date, description }: FrontMatterShape) => ({
  children: content,
}: any) => (
  <>
    <NextSeo
      canonical={url}
      description={description}
      openGraph={{
        type: 'article',
        title,
        description,
        url,
        article: {
          publishedTime: date && new Date(date)?.toISOString().slice(0, 10),
        },
      }}
      title={title}
    />
    <Text
      as="h1"
      css={{
        color: '#fffffe',
      }}
      fontSize={['fontSize80', 'fontSize100']}
      letterSpacing="-1px"
      lineHeight={['lineHeight80', 'lineHeight100']}
    >
      {title}
    </Text>
    <Text as="p" color="colorTextWeak" marginBottom="space100">
      {date.toDateString()}
    </Text>
    {content}
  </>
);

// eslint-disable-next-line import/no-default-export
export default Post;