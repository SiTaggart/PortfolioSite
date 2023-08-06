import type React from 'react';
import { MDXProvider } from '@mdx-js/react';
import Link from 'next/link';
import { Anchor, type AnchorProps } from '@twilio-paste/core/anchor';
import { Box } from '@twilio-paste/core/box';
import { Heading } from '@twilio-paste/core/heading';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { OrderedList, UnorderedList, ListItem } from '@twilio-paste/core/list';
import { Separator } from '@twilio-paste/core/separator';
import { Table as PasteTable, THead, TBody, TFoot, Tr, Th, Td } from '@twilio-paste/core/table';
import { CodeBlock, InlineCode as InlineCodeSnippet } from './CodeBlocks';
import { Blockquote } from './Blockquote';

export const Image: React.FC = (props) => (
  <Box as="img" display="block" marginLeft="auto" marginRight="auto" maxWidth="100%" {...props} />
);

const H1: React.FC = (props) => <Heading {...props} as="h1" variant="heading10" />;
const H2: React.FC = (props) => <Heading {...props} as="h2" variant="heading20" />;
const H3: React.FC = (props) => <Heading {...props} as="h3" variant="heading30" />;
const H4: React.FC = (props) => <Heading {...props} as="h4" variant="heading40" />;
const H5: React.FC = (props) => <Heading {...props} as="h5" variant="heading50" />;
const H6: React.FC = (props) => <Heading {...props} as="h6" variant="heading60" />;
const InlineCode: React.FC = (props) => <InlineCodeSnippet {...props} />;
const Em: React.FC = (props) => <em {...props} />;
const Strong: React.FC = (props) => <strong {...props} />;
const Del: React.FC = (props) => <del {...props} />;
const Hr: React.FC = (props) => (
  <Separator {...props} orientation="horizontal" verticalSpacing="space70" />
);
const A: React.FC<React.PropsWithChildren<AnchorProps>> = (props) => (
  <Link {...props} legacyBehavior passHref>
    <Anchor {...props} />
  </Link>
);
const Sup: React.FC = (props) => <sup {...props} />;
const Table: React.FC<{ children: NonNullable<React.ReactNode> }> = ({ children, ...props }) => (
  <Box marginBottom="space120">
    <PasteTable {...props}>{children}</PasteTable>
  </Box>
);
const Content: React.FC = (props) => <div {...props} />;
const ContentWrapper: React.FC = (props) => <div {...props} />;

export const ComponentProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <MDXProvider
    components={{
      h1: H1 as any,
      h2: H2 as any,
      h3: H3 as any,
      h4: H4 as any,
      h5: H5 as any,
      h6: H6 as any,
      p: Paragraph as any,
      ul: UnorderedList as any,
      ol: OrderedList as any,
      li: ListItem as any,
      blockquote: Blockquote as any,
      table: Table as any,
      thead: THead as any,
      tbody: TBody as any,
      tfoot: TFoot as any,
      tr: Tr as any,
      th: Th as any,
      td: Td as any,
      pre: CodeBlock as any,
      code: InlineCode as any,
      inlineCode: InlineCode as any,
      em: Em as any,
      strong: Strong as any,
      del: Del as any,
      hr: Hr as any,
      a: A as any,
      img: Image as any,
      sup: Sup as any,
      content: Content as any,
      contentwrapper: ContentWrapper as any,
    }}
  >
    {children}
  </MDXProvider>
);
