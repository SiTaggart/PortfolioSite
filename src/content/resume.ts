export interface Role {
  bullets?: ReadonlyArray<string>;
  company: string;
  end: string;
  location?: string;
  progression?: string;
  start: string;
  summary?: string;
  title?: string;
}

export interface ContactLink {
  display: string;
  href: string;
  label: string;
}

export interface Resume {
  about: ReadonlyArray<string>;
  contact: ReadonlyArray<ContactLink>;
  descriptor: string;
  earlier: Role;
  experience: ReadonlyArray<Role>;
  intro: ReadonlyArray<string>;
  name: string;
}

export const resume = {
  about: [
    'Originally from the south coast of England, by way of Sydney and San Francisco. Art and design background, then a degree in Business Information Technology from Southampton Solent University, then the web platform ever since. I still believe in it.',
    'I like small teams, lean process, rapid prototyping and talking to the people who use the thing. Off the clock: sim racing, video games and watch collecting.',
  ],
  contact: [
    { display: 'me@simontaggart.com', href: 'mailto:me@simontaggart.com', label: 'Email' },
    { display: 'github.com/SiTaggart', href: 'https://github.com/SiTaggart', label: 'GitHub' },
    {
      display: 'linkedin.com/in/SiTaggart',
      href: 'https://www.linkedin.com/in/SiTaggart',
      label: 'LinkedIn',
    },
  ],
  descriptor: 'Product Engineer · Redwood City, California',
  earlier: {
    company: 'Earlier',
    end: '2016',
    start: '2006',
    summary:
      'Front-end engineering and UI roles at BigCommerce, Flippa, SitePoint, Orchard and Abacus e-Media, in the UK, Australia and the US. Responsive design before it had a name, web standards, accessibility, and a lot of CSS.',
  },
  experience: [
    {
      bullets: [
        'Dashboards, charts, maps, search and configurable layouts for traders, quantitative analysts, meteorologists and researchers.',
        'The people who use the platform are colleagues, so ideas get checked with expert users while they are still sketches.',
      ],
      company: 'SESCO',
      end: 'present',
      start: '2025',
      summary:
        'Own the front end of the trading platform end to end: product decisions, interface design, and the React and TypeScript that ships.',
      title: 'Product Engineer',
    },
    {
      bullets: [
        'Led adoption of shared enterprise patterns across a portfolio of 600+ internal products. Pattern usage grew from 150 to more than 2,200 instances.',
        'Ran about 15 craft reviews a week, plus regular office hours on design system usage.',
        'Built the contribution pipeline from product teams into the underlying design system.',
      ],
      company: 'Meta',
      end: '2025',
      location: 'Menlo Park',
      start: '2024',
      summary:
        'Strategy and roadmap for the Enterprise Pattern System, the pattern layer for Meta’s internal enterprise products.',
      title: 'Product Designer, IC7',
    },
    {
      bullets: [
        'Created and ran Paste, Twilio’s open source design system, used across Console and Flex and by customers building on Twilio.',
        'Led four cross-functional teams, sixteen people, across UX engineering, product design, content design and design ops.',
        'Owned the visual design language across Twilio products and led the unification of Segment and SendGrid into one Twilio system.',
      ],
      company: 'Twilio',
      end: '2024',
      location: 'San Francisco',
      progression: 'Principal → Senior Principal → Architect and Director',
      start: '2019',
      summary:
        'Ran UX infrastructure for Twilio, and served as accessibility subject matter expert for its products and as a member of the global architecture and R&D leadership group.',
      title: 'Architect and Director, UX Infrastructure and Engineering',
    },
    {
      bullets: [
        'Led the re-architecture of the design system to align with Lightning Web Components.',
        'Participated in standards work and technical discussions across ARIA, HTML, the Accessibility Object Model and Web Components.',
        'Technical expert on accessible component authoring, and mentor to design and engineering teams.',
      ],
      company: 'Salesforce',
      end: '2019',
      location: 'San Francisco',
      start: '2016',
      summary:
        'Led accessibility for the core platform, App Experience, UI components and the Lightning Design System.',
      title: 'Lead UX Engineer, Accessibility and Design Systems',
    },
  ],
  intro: [
    'I design and build data-heavy products, then turn the patterns that work into systems other teams can ship with.',
    'At SESCO I own the UI of a trading platform for U.S. electricity markets: the components, patterns and systems the screens are built from. Previously I led Paste at Twilio, enterprise patterns at Meta, and accessibility and design-system architecture at Salesforce.',
  ],
  name: 'Simon Taggart',
} as const satisfies Resume;
