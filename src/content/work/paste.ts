import type { CaseStudy } from './types';

export const paste: CaseStudy = {
  description:
    'From first commit to an open-source system adopted across Twilio: architecture, contribution, adoption and unification.',
  evidence: [
    {
      href: 'https://github.com/twilio-labs/paste',
      label: 'twilio-labs/paste on GitHub',
    },
    {
      href: 'https://www.twilio.com/en-us/blog/developers/bringing-cohesion-to-the-twilio-product-suite-part-ii',
      label: 'Bringing Cohesion to the Twilio Product Suite: Part II — Loreina Chew, Twilio',
    },
    {
      href: 'https://github.com/twilio-labs/paste/blob/main/packages/paste-website/src/pages/blog/2024-02-06-paste-2023-year-in-review.mdx',
      label: 'Paste 2023 – A year in review, source on GitHub',
    },
  ],
  name: 'Paste and Twilio product unification',
  organisation: 'Twilio',
  outcomes: [
    'By the time I left, every Twilio team was on Paste or adopting it, including Console and Flex.',
    'Developed in the open as twilio-labs/paste.',
  ],
  role: 'Product owner, architect and UX Infrastructure leader.',
  sections: [
    {
      heading: 'The problem',
      id: 'the-problem',
      paragraphs: [
        'Before Paste, teams at Twilio built their own product interfaces. That is a reasonable thing for one team to do and an expensive thing for a company to do. Every team paid again for the same components, the same accessibility work and the same decisions about spacing and colour, and the results did not match one another. Customers moving between Twilio products met a different interface each time.',
        'Paste existed to give Twilio one consistent, accessible interface layer that any team could build on, and to make using it easier than not using it.',
      ],
    },
    {
      heading: 'What I owned',
      id: 'what-i-owned',
      paragraphs: [
        'I was Twilio’s first principal-level front-end engineer, and the first engineer hired onto Paste. The architecture was mine from the start: what went into the system, how it was built, and how teams got onto it. I took over product ownership later, after Aayush Iyer left Twilio. Alongside that I led the UX Infrastructure organisation: four teams, sixteen people, across UX engineering, product design, content design and design ops.',
        'A design system fails on adoption far more often than it fails on components, and adoption is a people problem before it is a technical one.',
      ],
    },
    {
      heading: 'The system',
      id: 'the-system',
      paragraphs: [
        'Paste ships as React components with matching design kits, so a designer and an engineer describing the same screen are describing the same thing rather than two things that resemble each other.',
        'Accessibility is built into the components rather than documented next to them. Keyboard behaviour, focus management, semantics and contrast get decided once, inside the component, by people who do that work full time. A product team gets them by using the thing.',
      ],
    },
    {
      heading: 'Open source',
      id: 'open-source',
      paragraphs: [
        'Paste is developed in the open, at twilio-labs/paste. Working in public sets a floor under the quality: the API, the documentation and the reasoning are all visible, and customers building on Twilio can use the same components Twilio uses.',
        'Contribution and governance were designed rather than improvised. Product teams needed a route into the system when they hit a gap, and the system needed a way to accept that work without becoming the union of everyone’s one-offs. That is a governance question before it is a code question: who decides, on what evidence, and what happens to the code afterwards.',
      ],
    },
    {
      heading: 'Adoption',
      id: 'adoption',
      paragraphs: [
        'Adoption did not stop at a handful of early teams. By the time I left, every Twilio team was on Paste or adopting it, including Console and Flex. Once the component layer was shared, the harder problem came into view: Twilio had acquired Segment and SendGrid, and the combined portfolio did not read as one company’s software. The work that followed, One Twilio, was to unify the design language across those products.',
        'The team put numbers on the gap. Product cohesion was rated 2.47 out of 5, and 61.22% of surveyed respondents disagreed that the products looked cohesive. The unified navigation the team proposed was then rated 5 out of 5, unanimously, by around twenty stakeholders. Loreina Chew wrote that research up for the Twilio blog; the work behind it was done by the UX Infrastructure team I led.',
      ],
    },
    {
      heading: 'Where it got to',
      id: 'where-it-got-to',
      paragraphs: [
        'I wrote up the state of the system at the end of 2023 as a year-in-review post on the Paste blog. The Paste website has since been retired, but the post survives in the repository, and so do the components.',
      ],
    },
  ],
  standfirst:
    'An open source design system for Twilio, from the first commit to adoption across the company.',
  summary:
    'From first commit to an open-source system adopted across Twilio. Architecture, contribution, adoption and cross-product unification.',
  title: 'Paste and Twilio product unification',
  to: '/work/paste',
  years: '2019–2024',
};
