import type { CaseStudy } from './types';

export const accessibleSystems: CaseStudy = {
  description:
    'Accessible component architecture across Salesforce, standards work and independent tools including Are My Colors Accessible and Color Combos.',
  evidence: [
    {
      href: 'https://github.com/salesforce-ux/design-system',
      kind: 'external',
      label: 'Lightning Design System on GitHub',
    },
    {
      href: 'https://lists.w3.org/Archives/Public/public-webapps-github/2018Aug/0875.html',
      kind: 'external',
      label: 'W3C archive: focusability without sprouting tabindex, 2018',
    },
    {
      href: 'https://aremycolorsaccessible.com',
      kind: 'external',
      label: 'Are My Colors Accessible',
    },
    {
      href: 'https://github.com/SiTaggart/AreMyColorsAccessible',
      kind: 'external',
      label: 'AreMyColorsAccessible on GitHub',
    },
    {
      href: 'https://github.com/SiTaggart/color-combos',
      kind: 'external',
      label: 'color-combos on GitHub',
    },
    {
      kind: 'post',
      label: 'How we "CSS" at BigCommerce, 2016',
      slug: '2016-02-01-how-we-css-at-bigcommerce',
    },
    {
      kind: 'post',
      label: 'The Living Style Guide Pattern Lab, 2016',
      slug: '2016-03-04-the-living-styleguide-pattern-lab',
    },
  ],
  name: 'Accessible product systems',
  organisation: 'Salesforce, BigCommerce and independent',
  outcomes: [
    'Lightning Design System re-architected to align with Lightning Web Components.',
    'Are My Colors Accessible, live since 2016 and still maintained.',
  ],
  role: 'Accessibility lead, UX engineer and independent product creator.',
  sections: [
    {
      heading: 'Employer work',
      id: 'employer-work',
      paragraphs: [
        'At Salesforce I led accessibility for the core platform, App Experience, the UI component library and the Lightning Design System. That is a wide surface, and the only way to cover it is to push the work down the stack: into tokens, into components, into the system everything else is assembled from.',
        'I led the re-architecture of the Lightning Design System to align with Lightning Web Components — the point at which styling, semantics and behaviour stop being three concerns maintained by three groups. Alongside that I was the technical expert on accessible component authoring and mentored design and engineering teams, which is how the knowledge outlives any one reviewer.',
        'Earlier, at BigCommerce in 2016, I led the effort to create a design system and a component and pattern library. Two posts from that period are the clearest surviving record of how we thought about it: one on the CSS conventions we agreed on, one on the living style guide we built from them.',
      ],
    },
    {
      heading: 'Standards',
      id: 'standards',
      paragraphs: [
        'A good deal of web accessibility is settled in specifications, so I took part in the discussions: ARIA, HTML, the Accessibility Object Model and Web Components. Participation rather than authorship — filing issues, arguing about edge cases, and reporting what breaks when a specification meets a real component library.',
        'A representative example is a 2018 thread on Web Components about making an element focusable without sprouting a tabindex attribute into the page. That is a small question with a long tail. It decides whether a component author can do the correct thing without leaving debris in somebody else’s markup.',
      ],
    },
    {
      heading: 'Independent products',
      id: 'independent-products',
      paragraphs: [
        'Are My Colors Accessible has been live since 2016. Type in two colours, get an honest answer about their contrast. It has stayed deliberately small, and I still maintain it.',
        'Color Combos is the library underneath it: the TypeScript contrast engine behind Are My Colors Accessible. Give it colours and it returns every pairing with its contrast ratio and WCAG rating. Splitting the engine out means the arithmetic can be tested and versioned on its own, and used by other people without the interface coming along with it.',
      ],
    },
    {
      heading: 'How it connects',
      id: 'how-it-connects',
      paragraphs: [
        'Tokens, components, semantics and testing are one chain rather than four programmes of work. A token decides whether adequate contrast is even reachable. A component decides whether correct semantics are the default or something to remember. Semantics decide what assistive technology is told. Tests decide whether any of it survives the next six months of changes.',
        'Every part of the work above sits somewhere on that chain, which is why a contrast checker and a design system re-architecture are the same job at different scales.',
      ],
    },
  ],
  standfirst:
    'Accessibility as employer work, as standards participation, and as products I keep running myself.',
  summary:
    'Accessible component architecture across Salesforce, standards work and independent tools including Are My Colors Accessible and Color Combos.',
  title: 'Accessible product systems',
  to: '/work/accessible-systems',
  years: '2016–present',
};
