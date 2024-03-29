import type React from 'react';
import { Text } from '@twilio-paste/core/text';
import { NextSeo } from 'next-seo';
import { MetaDataShape } from '../types';

interface PostLayoutProps {
  children: React.ReactNode;
  meta: MetaDataShape;
}

const Post: React.FC<PostLayoutProps> = ({ children, meta: { title, url, date, description } }) => (
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
      color="colorTextWeak"
      fontSize={['fontSize80', 'fontSize100']}
      letterSpacing="-1px"
      lineHeight={['lineHeight80', 'lineHeight100']}
    >
      {title}
    </Text>
    <Text as="p" color="colorTextWeak" marginBottom="space100">
      {new Date(date).toDateString()}
    </Text>
    {children}
  </>
);

// eslint-disable-next-line import/no-default-export
export default Post;
