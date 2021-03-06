import * as React from 'react';
import { MDXProvider } from '@mdx-js/react';
import Link from 'next/link';
import { Anchor, AnchorProps } from '@twilio-paste/core/anchor';
import { Box } from '@twilio-paste/core/box';
import { Heading, HeadingProps } from '@twilio-paste/core/heading';
import { Paragraph, ParagraphProps } from '@twilio-paste/core/paragraph';
import {
  OrderedList,
  OrderedListProps,
  UnorderedList,
  UnorderedListProps,
  ListItem,
  ListItemProps,
} from '@twilio-paste/core/list';
import { Separator, SeparatorProps } from '@twilio-paste/core/separator';
import { CodeBlock, InlineCode } from './CodeBlocks';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from './Table';
import { Blockquote } from './Blockquote';

export const Image: React.FC = (props) => (
  <Box as="img" display="block" marginLeft="auto" marginRight="auto" maxWidth="100%" {...props} />
);

export const ComponentProvider: React.FC = ({ children }) => (
  <MDXProvider
    components={{
      h1: (props: HeadingProps): React.ReactElement => (
        <Heading {...props} as="h1" variant="heading10" />
      ),
      h2: (props: HeadingProps): React.ReactElement => (
        <Heading {...props} as="h2" variant="heading20" />
      ),
      h3: (props: HeadingProps): React.ReactElement => (
        <Heading {...props} as="h3" variant="heading30" />
      ),
      h4: (props: HeadingProps): React.ReactElement => (
        <Heading {...props} as="h4" variant="heading40" />
      ),
      h5: (props: HeadingProps): React.ReactElement => (
        <Heading {...props} as="h5" variant="heading50" />
      ),
      h6: (props: HeadingProps): React.ReactElement => (
        <Heading {...props} as="h6" variant="heading60" />
      ),
      p: (props: ParagraphProps): React.ReactElement => <Paragraph {...props} />,
      ul: (props: UnorderedListProps): React.ReactElement => <UnorderedList {...props} />,
      ol: (props: OrderedListProps): React.ReactElement => <OrderedList {...props} />,
      li: (props: ListItemProps): React.ReactElement => <ListItem {...props} />,
      blockquote: (props: React.ComponentProps<'blockquote'>): React.ReactElement => (
        <Blockquote {...props} />
      ),
      table: (props: React.ComponentProps<'table'>): React.ReactElement => <Table {...props} />,
      thead: (props: React.ComponentProps<'thead'>): React.ReactElement => <Thead {...props} />,
      tbody: (props: React.ComponentProps<'tbody'>): React.ReactElement => <Tbody {...props} />,
      tfoot: (props: React.ComponentProps<'tfoot'>): React.ReactElement => <Tfoot {...props} />,
      tr: (props: React.ComponentProps<'tr'>): React.ReactElement => <Tr {...props} />,
      th: (props: React.ComponentProps<'th'>): React.ReactElement => <Th {...props} />,
      td: (props: React.ComponentProps<'td'>): React.ReactElement => <Td {...props} />,
      pre: (props: React.ComponentProps<'pre'>): React.ReactElement => <CodeBlock {...props} />,
      code: (props: React.ComponentProps<'code'>): React.ReactElement => <code {...props} />,
      inlineCode: (props: React.ComponentProps<'code'>): React.ReactElement => (
        <InlineCode {...props} />
      ),
      em: (props: React.ComponentProps<'em'>): React.ReactElement => <em {...props} />,
      strong: (props: React.ComponentProps<'strong'>): React.ReactElement => <strong {...props} />,
      del: (props: React.ComponentProps<'del'>): React.ReactElement => <del {...props} />,
      hr: (props: SeparatorProps): React.ReactElement => (
        <Separator {...props} orientation="horizontal" verticalSpacing="space70" />
      ),
      a: (props: AnchorProps): React.ReactElement => (
        <Link {...props} passHref>
          <Anchor {...props} />
        </Link>
      ), // eslint-disable-line jsx-a11y/anchor-has-content
      img: (props: React.ComponentProps<'img'>): React.ReactElement => <Image {...props} />, // eslint-disable-line jsx-a11y/alt-text
      sup: (props: React.ComponentProps<'sup'>): React.ReactElement => <sup {...props} />,
      content: (props: React.ComponentProps<'div'>): React.ReactElement => <div {...props} />,
      contentwrapper: (props: React.ComponentProps<'div'>): React.ReactElement => (
        <div {...props} />
      ),
    }}
  >
    {children}
  </MDXProvider>
);
