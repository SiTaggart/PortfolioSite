import type React from 'react';
import { MDXProvider } from '@mdx-js/react';
import Link from 'next/link';
import { Anchor, AnchorProps, AnchorTargets } from '@twilio-paste/core/anchor';
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
interface AProps
  extends Pick<AnchorProps, 'tabIndex'>,
    Omit<
      React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
      'tabIndex' | 'href'
    > {
  href: string;
  children: React.ReactElement;
  target: AnchorTargets;
  ref: AnchorProps['ref'];
}
const A: React.FC<AProps> = (props) => (
  <Link {...props} passHref>
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

export const ComponentProvider: React.FC = ({ children }) => (
  <MDXProvider
    components={{
      h1: H1,
      h2: H2,
      h3: H3,
      h4: H4,
      h5: H5,
      h6: H6,
      p: Paragraph as React.FC,
      ul: UnorderedList as React.FC,
      ol: OrderedList as React.FC,
      li: ListItem as React.FC,
      blockquote: Blockquote as React.FC,
      table: Table as React.FC,
      thead: THead as React.FC,
      tbody: TBody as React.FC,
      tfoot: TFoot as React.FC,
      tr: Tr as React.FC,
      th: Th as React.FC,
      td: Td as React.FC,
      pre: CodeBlock,
      code: InlineCode,
      inlineCode: InlineCode,
      em: Em,
      strong: Strong,
      del: Del,
      hr: Hr,
      a: A as React.FC,
      img: Image as React.FC,
      sup: Sup,
      content: Content,
      contentwrapper: ContentWrapper,
    }}
  >
    {children}
  </MDXProvider>
);
