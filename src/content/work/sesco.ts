import type { CaseStudy } from './types';

export const sesco: CaseStudy = {
  description:
    'Trading and market-analysis software for expert users in U.S. electricity markets: product design, data visualisation and React engineering.',
  evidence: [{ href: 'https://sescollc.com/', kind: 'external', label: 'SESCO Enterprises' }],
  name: 'SESCO trading platform',
  organisation: 'SESCO Enterprises',
  outcomes: [
    'Dashboards, charts, maps, search and configurable layouts, built and maintained as one front end.',
    'Built for traders, quantitative analysts, meteorologists and researchers.',
  ],
  role: 'Product strategy, interaction design, front-end architecture and implementation.',
  sections: [
    {
      heading: 'Confidentiality',
      id: 'confidentiality',
      paragraphs: [
        'The platform and its market data are proprietary. This case study describes the product and design approach without exposing trading strategies, confidential data or internal models.',
      ],
    },
    {
      heading: 'Who uses it',
      id: 'who-uses-it',
      paragraphs: [
        'SESCO is a proprietary commodities trading firm specialising in U.S. electricity markets. It has been trading since 2002, and the business runs on quantitative modelling, weather analysis and research.',
        'The people who use what I build are traders, quantitative analysts, meteorologists and researchers. They know their domain far better than I do. The interface does not need to teach them their job. It needs to stay out of the way while they do it.',
      ],
    },
    {
      heading: 'The problem',
      id: 'the-problem',
      paragraphs: [
        'Electricity markets produce a great deal of data and it goes stale quickly. The language is specialist. The decisions are time-sensitive, and they are made against a clock that does not stop for a loading spinner.',
        'People also sit in front of these screens for most of the working day. A friction that is mildly irritating on first look becomes a real cost by the end of the week. So the constraint is a narrow one: put a lot of information on the screen, keep it readable at a glance, and keep it quick.',
      ],
    },
    {
      heading: 'What I do',
      id: 'what-i-do',
      paragraphs: [
        'I own the front end end to end. That covers the product thinking about what a screen is for, the interface design, and the React and TypeScript that ships it. There is no handoff between those three. Most days I am somewhere between a designer, an engineer and the person asking why.',
        'The work is dashboards, charts, maps, search, configurable layouts and the data-heavy workflows that connect them. Many screens are some combination of a time series, a geography and a table, and much of the design problem is deciding which of the three leads and what the other two become.',
      ],
    },
    {
      heading: 'Feedback loop',
      id: 'feedback-loop',
      paragraphs: [
        'The feedback loop is short, because the expert users are colleagues. I can sketch something, put it in front of a trader, and find out that the part I thought was hard was not the hard part. That is the main advantage this job has over anything I worked on at a larger company, and I try not to waste it.',
        'It also changes what research means here. Rather than scheduling sessions, I watch how the product is used across a working day: which screen stays open, which one gets closed, and where people still reach for something else because the product did not quite finish the job.',
      ],
    },
    {
      heading: 'Density and speed',
      id: 'density-and-speed',
      paragraphs: [
        'Density, legibility and speed pull against each other. More information per screen means smaller type and tighter spacing, which costs legibility. More responsiveness sometimes means showing less, or showing it later. Every screen is a position taken on that trade-off rather than an escape from it.',
        'What holds it together is a small and strict set of typographic and colour rules, so density does not turn into noise; charts and tables that share scales and units, so numbers can be compared across panels without arithmetic; and layouts the user can configure, because the right density for a meteorologist is not the right density for a trader.',
      ],
    },
  ],
  standfirst:
    'Product, design and engineering for the screens a proprietary electricity-trading firm uses all day.',
  summary:
    'Trading and market-analysis software for expert users in U.S. electricity markets. Product design, data visualisation and React engineering for dense, time-sensitive workflows.',
  title: 'SESCO trading platform',
  to: '/work/sesco',
  years: '2025–present',
};
