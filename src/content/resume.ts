export interface Role {
  bullets?: ReadonlyArray<string>;
  company: string;
  end: string;
  location?: string;
  start: string;
  summary?: string;
  title?: string;
}

export interface Project {
  description: string;
  name: string;
  url?: string;
}

export interface ElsewhereLink {
  display: string;
  href: string;
  label: string;
}

export interface Resume {
  about: ReadonlyArray<string>;
  earlier: Role;
  elsewhere: ReadonlyArray<ElsewhereLink>;
  experience: ReadonlyArray<Role>;
  intro: ReadonlyArray<string>;
  name: string;
  now: Role;
  projects: ReadonlyArray<Project>;
  roleLine: string;
}

export const resume = {
  about: [
    'Originally from the south coast of England, by way of Sydney and San Francisco. Art and design background, then a degree in Business Information Technology from Southampton Solent University, then the web platform ever since. I still believe in it.',
    'I like small teams, lean process, rapid prototyping and talking to the people who use the thing. Off the clock: sim racing, and building an AI meme generator for my racing league because someone had to.',
  ],
  earlier: {
    company: 'Earlier',
    end: '2016',
    start: '2006',
    summary:
      'Front-end engineering and UI roles at BigCommerce, Flippa, SitePoint, Orchard and Abacus e-Media, in the UK, Australia and the US. Responsive design before it had a name, web standards, accessibility, and a lot of CSS. I still like CSS. I do not recommend the cascade.',
  },
  elsewhere: [
    { display: 'me@simontaggart.com', href: 'mailto:me@simontaggart.com', label: 'Email' },
    { display: 'github.com/SiTaggart', href: 'https://github.com/SiTaggart', label: 'GitHub' },
    {
      display: 'linkedin.com/in/SiTaggart',
      href: 'https://www.linkedin.com/in/SiTaggart',
      label: 'LinkedIn',
    },
    {
      display: 'PDF on Google Drive',
      href: 'https://drive.google.com/file/d/10wZqDNx7ge4lqm9b07_f7PGH7oWYBdK9/view',
      label: 'CV',
    },
  ],
  experience: [
    {
      bullets: [
        'Led strategy and roadmap for the Enterprise Pattern System, the pattern layer for Meta’s internal enterprise products.',
        'Took 600+ internal products onto shared patterns, growing adoption from 150 to over 2,200 instances and saving an estimated 4,000 engineering days.',
        'Ran about 15 craft reviews a week and regular office hours on design system usage, and built the contribution pipeline from product teams into the underlying design system.',
      ],
      company: 'Meta',
      end: '2025',
      location: 'Menlo Park',
      start: '2024',
      title: 'Product Designer, IC7',
    },
    {
      bullets: [
        'Created and ran Paste, Twilio’s open source design system, used across Console and Flex, and by customers building on Twilio.',
        'Led four cross-functional teams (16 people) across UX engineering, product design, content design and design ops.',
        'Owned the visual design language across Twilio products, and led the unification of Segment and SendGrid into one Twilio system.',
        'Accessibility subject matter expert for all Twilio products; member of the global architecture and R&D leadership group.',
        'Grew from Principal UX Engineer to Senior Principal to Architect and Director.',
      ],
      company: 'Twilio',
      end: '2024',
      location: 'San Francisco',
      start: '2019',
      title: 'Architect and Director, UX Infrastructure and Engineering',
    },
    {
      bullets: [
        'Led accessibility for the core platform, App Experience, UI components and the Lightning Design System.',
        'Led the re-architecture of the design system to align with Lightning Web Components.',
        'Contributed to W3C specifications: ARIA, HTML, the Accessibility Object Model and Web Components.',
        'Technical expert on accessible component authoring, and mentor to design and engineering teams.',
      ],
      company: 'Salesforce',
      end: '2019',
      location: 'San Francisco',
      start: '2016',
      title: 'Lead UX Engineer, Accessibility and Design Systems',
    },
  ],
  intro: [
    'I build software people use for hours a day and design the systems that make it hold together. Twenty years of front-end engineering, design systems and accessibility, spread across the UK, Australia and the US.',
    'These days I am a Product Engineer at SESCO, an energy trading firm, where I design and build the tools our traders and analysts use every day. Before that I led design systems and UX engineering at Meta, Twilio and Salesforce.',
  ],
  name: 'Simon Taggart',
  now: {
    company: 'SESCO',
    end: 'present',
    start: '2025',
    summary:
      'Small team, real users, fast feedback. I own the trading platform’s front end: product thinking, interface design and the React and TypeScript that ships. Most days I am somewhere between a designer, an engineer and the person asking why.',
  },
  projects: [
    {
      description:
        'Twilio’s open source design system. Product owner and architect from the first commit to a system used by 35+ teams.',
      name: 'Paste Design System',
      url: 'https://paste.twilio.design',
    },
    {
      description:
        'A colour contrast checker I built in 2016 and still maintain. Type two colours, get an honest answer.',
      name: 'Are My Colors Accessible',
      url: 'https://www.aremycolorsaccessible.com',
    },
    {
      description:
        'The TypeScript library under Are My Colors Accessible. Give it colours, get back every pairing with contrast ratio and WCAG rating.',
      name: 'Color Combos',
      url: 'https://github.com/SiTaggart/color-combos',
    },
    {
      description: 'Accessibility lead and design system re-architecture at Salesforce.',
      name: 'Lightning Design System',
      url: 'https://www.lightningdesignsystem.com',
    },
    {
      description:
        'Meta’s internal pattern layer for enterprise tooling. Strategy, roadmap and adoption.',
      name: 'Enterprise Pattern System',
    },
  ],
  roleLine: 'Product Engineer at SESCO · Redwood City, California',
} as const satisfies Resume;
