import * as React from 'react';
import { useUID } from 'react-uid';
import Link from 'next/link';
import useSWR from 'swr';
import fetch from 'isomorphic-unfetch';
import twitter from 'twitter-text';
import { Anchor, Text, UnorderedList, ListItem, Heading } from '@twilio-paste/core';
import sortBy from 'lodash.sortby';
import reverse from 'lodash.reverse';
// @ts-ignore
import { frontMatter as allPosts } from './posts/**/*.mdx';

type Tweet = {
  text: string;
};
type Tweets = Tweet[];

const fetcher = (url: string): Promise<Tweets> => fetch(url).then((r) => r.json());

const Index: React.FC = () => {
  const { data } = useSWR('api/tweets', fetcher);
  const sortedPosts = reverse(sortBy(allPosts, ['date']));
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
        Simon <br /> Taggart
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
      {data && (
        <>
          <Heading as="h2" variant="heading20">
            Tweet
          </Heading>
          <Text
            as="p"
            dangerouslySetInnerHTML={{ __html: twitter.autoLink(twitter.htmlEscape(data[0].text)) }}
            marginBottom="space70"
          />
        </>
      )}
      <Heading as="h2" variant="heading20">
        <Link href="/posts/" passHref>
          <Anchor href="/posts/">Posts</Anchor>
        </Link>
      </Heading>
      <UnorderedList>
        {sortedPosts.map((post) => (
          <ListItem key={useUID()}>
            <Link href={post.__resourcePath.replace('index.mdx', '')} passHref>
              <Anchor href={post.__resourcePath.replace('index.mdx', '')}>{post.title}</Anchor>
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default Index;
