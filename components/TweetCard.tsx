import * as React from 'react';
import { css } from '@styled-system/css';
import twitter from 'twitter-text';
import { Box, Text, Card, MediaObject, MediaFigure, MediaBody, Anchor } from '@twilio-paste/core';
import TwitterSVG from '../svg/icons/ic-twitter.svg';
import { Tweets } from '../types';

interface TweetCardProps {
  twitterData: Tweets;
}
export const TweetCard: React.FC<TweetCardProps> = ({ twitterData }) => (
  <Box marginBottom="space140" marginTop="space140">
    <Card>
      <Text
        as="h2"
        css={{
          color: '#fffffe',
        }}
        fontSize="fontSize60"
        fontWeight="fontWeightSemibold"
        lineHeight="lineHeight60"
        marginBottom="space20"
      >
        <MediaObject verticalAlign="center">
          <MediaFigure spacing="space20">
            <Text as="span" color="colorTextBrandHighlight" display="flex">
              <TwitterSVG
                aria-hidden="true"
                css={css({
                  height: 'sizeIcon90',
                  width: 'sizeIcon90',
                  path: {
                    fill: 'currentColor',
                  },
                })}
              />
            </Text>
          </MediaFigure>
          <MediaBody>
            <Anchor href="https://www.twitter.com/SiTaggart">SiTaggart</Anchor>
          </MediaBody>
        </MediaObject>
      </Text>
      <Text
        as="p"
        css={css({
          '.tweet-url': {
            color: 'colorTextLink',
            ':hover': {
              color: 'colorTextLinkDarker',
              textDecoration: 'none',
            },
          },
        })}
        dangerouslySetInnerHTML={{
          __html: twitter.autoLink(twitter.htmlEscape(twitterData[0]!.text)),
        }}
        margin="space0"
      />
    </Card>
  </Box>
);
