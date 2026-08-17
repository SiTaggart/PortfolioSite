export type WritingRow =
  | { attribution?: string; href: string; kind: 'external'; source: string; title: string }
  | { kind: 'post'; slug: string; source: string; title: string };

export const externalWriting: ReadonlyArray<WritingRow> = [
  {
    href: 'https://github.com/twilio-labs/paste/blob/main/packages/paste-website/src/pages/blog/2024-02-06-paste-2023-year-in-review.mdx',
    kind: 'external',
    source: 'Paste blog, 2024 — source on GitHub',
    title: '2023 – A year in review',
  },
  {
    attribution: 'by Loreina Chew; work of the UX Infrastructure team I led',
    href: 'https://www.twilio.com/en-us/blog/developers/bringing-cohesion-to-the-twilio-product-suite-part-ii',
    kind: 'external',
    source: 'Twilio, 2023',
    title: 'Bringing Cohesion to the Twilio Product Suite: Part II, Navigation',
  },
];

export const featuredWriting: ReadonlyArray<WritingRow> = [
  {
    kind: 'post',
    slug: '2019-01-11-im-super-good-at-css-and-i-dont-recommend-the-cascade-dont-@-me',
    source: 'simontaggart.com, 2019',
    title: 'I’m super good at CSS and I don’t recommend the cascade, don’t @ me',
  },
  externalWriting[0],
  externalWriting[1],
  {
    kind: 'post',
    slug: '2016-02-01-how-we-css-at-bigcommerce',
    source: 'simontaggart.com, 2016',
    title: 'How we "CSS" at BigCommerce',
  },
];
