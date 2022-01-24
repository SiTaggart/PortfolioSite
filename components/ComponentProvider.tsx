import * as React from 'react';
import { MDXProvider } from '@mdx-js/react';
import Link from 'next/link';
import { Anchor, AnchorProps } from '@twilio-paste/core/anchor';
import { Box } from '@twilio-paste/core/box';
import { Heading, HeadingProps } from '@twilio-paste/core/heading';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { OrderedList, UnorderedList, ListItem } from '@twilio-paste/core/list';
import { Separator, SeparatorProps } from '@twilio-paste/core/separator';
import { Table, THead, TBody, TFoot, Tr, Th, Td } from '@twilio-paste/core/table';
import { CodeBlock, InlineCode } from './CodeBlocks';
import { Blockquote } from './Blockquote';

export const Image: React.FC = (props) => (
  <Box as="img" display="block" marginLeft="auto" marginRight="auto" maxWidth="100%" {...props} />
);

const H1 = (props: HeadingProps): React.ReactElement => (
  <Heading {...props} as="h1" variant="heading10" />
);
const H2 = (props: HeadingProps): React.ReactElement => (
  <Heading {...props} as="h2" variant="heading20" />
);
const H3 = (props: HeadingProps): React.ReactElement => (
  <Heading {...props} as="h3" variant="heading30" />
);
const H4 = (props: HeadingProps): React.ReactElement => (
  <Heading {...props} as="h4" variant="heading40" />
);
const H5 = (props: HeadingProps): React.ReactElement => (
  <Heading {...props} as="h5" variant="heading50" />
);
const H6 = (props: HeadingProps): React.ReactElement => (
  <Heading {...props} as="h6" variant="heading60" />
);
const Code = (props: React.ComponentProps<'code'>): React.ReactElement => <code {...props} />;
const Em = (props: React.ComponentProps<'em'>): React.ReactElement => <em {...props} />;
const Strong = (props: React.ComponentProps<'strong'>): React.ReactElement => <strong {...props} />;
const Del = (props: React.ComponentProps<'del'>): React.ReactElement => <del {...props} />;
const Hr = (props: SeparatorProps): React.ReactElement => (
  <Separator {...props} orientation="horizontal" verticalSpacing="space70" />
);
const A = (props: AnchorProps): React.ReactElement => (
  <Link {...props} passHref>
    <Anchor {...props} />
  </Link>
);
const Sup = (props: React.ComponentProps<'sup'>): React.ReactElement => <sup {...props} />;
const Content = (props: React.ComponentProps<'div'>): React.ReactElement => <div {...props} />;
const ContentWrapper = (props: React.ComponentProps<'div'>): React.ReactElement => (
  <div {...props} />
);

export const ComponentProvider: React.FC = ({ children }) => (
  <MDXProvider
    components={{
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
      code: Code,
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
    }}
  >
    {children}
  </MDXProvider>
);
