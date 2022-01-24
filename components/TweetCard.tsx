import * as React from 'react';
import twitter from 'twitter-text';
import { css } from '@twilio-paste/core/styling-library';
import { useTheme } from '@twilio-paste/core/theme';
import { Box } from '@twilio-paste/core/box';
import { Text } from '@twilio-paste/core/text';
import { Card } from '@twilio-paste/core/card';
import { MediaObject, MediaFigure, MediaBody } from '@twilio-paste/core/media-object';
import { Anchor } from '@twilio-paste/core/anchor';
import TwitterSVG from '../svg/icons/ic-twitter.svg';
import { Tweets } from '../types';

interface TweetCardProps {
  twitterData: Tweets;
}
export const TweetCard: React.FC<TweetCardProps> = ({ twitterData }) => {
  const theme = useTheme();
  return (
    <Box marginBottom="space140" marginTop="space140">
      <Card>
        <Text
          as="h2"
          fontSize="fontSize60"
          fontWeight="fontWeightSemibold"
          lineHeight="lineHeight60"
          marginBottom="space20"
        >
          <MediaObject verticalAlign="center">
            <MediaFigure spacing="space20">
              <Text as="span" color="colorTextBrandHighlight" display="flex">
                <Box
                  aria-hidden="true"
                  as={TwitterSVG as any}
                  css={{
                    path: {
                      fill: 'currentColor',
                    },
                  }}
                  height="sizeIcon90"
                  // @ts-ignore
                  viewBox="0 0 56.693 56.693"
                  width="sizeIcon90"
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
          css={
            css({
              a: {
                color: 'colorTextLink',
                ':hover': {
                  color: 'colorTextLinkDarker',
                  textDecoration: 'none',
                },
              },
            })(theme) as any
          }
          dangerouslySetInnerHTML={{
            __html: twitter.autoLink(twitter.htmlEscape(twitterData[0]!.text)),
          }}
          margin="space0"
        />
      </Card>
    </Box>
  );
};
