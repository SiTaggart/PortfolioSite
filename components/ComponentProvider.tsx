import { MDXProvider } from '@mdx-js/react';
import { Anchor, type AnchorProps } from '@twilio-paste/core/anchor';
import { Box } from '@twilio-paste/core/box';
import { Heading } from '@twilio-paste/core/heading';
import { ListItem, OrderedList, UnorderedList } from '@twilio-paste/core/list';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Separator } from '@twilio-paste/core/separator';
import { Table as PasteTable, TBody, Td, TFoot, Th, THead, Tr } from '@twilio-paste/core/table';
import type { MDXComponents } from 'mdx/types';
import type React from 'react';
import { Blockquote } from './Blockquote';
import { CodeBlock, InlineCode as InlineCodeSnippet } from './CodeBlocks';

type MDXElementProps = React.PropsWithChildren<Record<string, unknown>>;

export function Image(props: MDXElementProps): React.ReactElement {
  return (
    <Box as="img" display="block" marginLeft="auto" marginRight="auto" maxWidth="100%" {...props} />
  );
}

function H1(props: MDXElementProps): React.ReactElement {
  return <Heading {...props} as="h1" variant="heading10" />;
}

function H2(props: MDXElementProps): React.ReactElement {
  return <Heading {...props} as="h2" variant="heading20" />;
}

function H3(props: MDXElementProps): React.ReactElement {
  return <Heading {...props} as="h3" variant="heading30" />;
}

function H4(props: MDXElementProps): React.ReactElement {
  return <Heading {...props} as="h4" variant="heading40" />;
}

function H5(props: MDXElementProps): React.ReactElement {
  return <Heading {...props} as="h5" variant="heading50" />;
}

function H6(props: MDXElementProps): React.ReactElement {
  return <Heading {...props} as="h6" variant="heading60" />;
}

function InlineCode(props: MDXElementProps): React.ReactElement {
  return <InlineCodeSnippet {...props} />;
}

function Em(props: MDXElementProps): React.ReactElement {
  return <em {...props} />;
}

function Strong(props: MDXElementProps): React.ReactElement {
  return <strong {...props} />;
}

function Del(props: MDXElementProps): React.ReactElement {
  return <del {...props} />;
}

function Hr(): React.ReactElement {
  return <Separator orientation="horizontal" verticalSpacing="space70" />;
}

function A({ href, children, ...props }: React.PropsWithChildren<AnchorProps>): React.ReactElement {
  return (
    <Anchor href={href} {...props}>
      {children}
    </Anchor>
  );
}

function Sup(props: MDXElementProps): React.ReactElement {
  return <sup {...props} />;
}

function Table({ children, ...props }: MDXElementProps): React.ReactElement {
  return (
    <Box marginBottom="space120">
      <PasteTable {...props}>{children ?? ''}</PasteTable>
    </Box>
  );
}

function Content(props: MDXElementProps): React.ReactElement {
  return <div {...props} />;
}

function ContentWrapper(props: MDXElementProps): React.ReactElement {
  return <div {...props} />;
}

const components: MDXComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: Paragraph,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  blockquote: Blockquote,
  table: Table,
  thead: THead,
  tbody: TBody,
  tfoot: TFoot,
  tr: Tr,
  th: Th,
  td: Td,
  pre: CodeBlock,
  code: InlineCode,
  inlineCode: InlineCode,
  em: Em,
  strong: Strong,
  del: Del,
  hr: Hr,
  a: A,
  img: Image,
  sup: Sup,
  content: Content,
  contentwrapper: ContentWrapper,
};

export function ComponentProvider({ children }: React.PropsWithChildren): React.ReactElement {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
