interface RouteCase {
  heading: string;
  path: string;
  title: string;
}

const routes: Array<RouteCase> = [
  { heading: 'Simon Taggart', path: '/', title: 'Simon Taggart — Product Engineer' },
  {
    heading: 'SESCO trading platform',
    path: '/work/sesco',
    title: 'Simon Taggart — SESCO trading platform',
  },
  {
    heading: 'Paste and Twilio product unification',
    path: '/work/paste',
    title: 'Simon Taggart — Paste and Twilio product unification',
  },
  {
    heading: 'Accessible product systems',
    path: '/work/accessible-systems',
    title: 'Simon Taggart — Accessible product systems',
  },
  { heading: 'Writing', path: '/posts', title: 'Simon Taggart — Writing' },
  {
    heading: 'How we "CSS" at BigCommerce',
    path: '/posts/2016-02-01-how-we-css-at-bigcommerce',
    title: 'Simon Taggart — How we "CSS" at BigCommerce',
  },
  {
    heading: 'How we use Sass Maps for Design Tokens and Developer Happiness',
    path: '/posts/2016-02-20-how-we-use-sass-maps-for-design-tokens-and-developer-happiness',
    title: 'Simon Taggart — How we use Sass Maps for Design Tokens and Developer Happiness',
  },
  {
    heading: 'The Living Style Guide Pattern Lab',
    path: '/posts/2016-03-04-the-living-styleguide-pattern-lab',
    title: 'Simon Taggart — The Living Style Guide Pattern Lab',
  },
  {
    heading: 'I’m super good at CSS and I don’t recommend the cascade, don’t @ me',
    path: '/posts/2019-01-11-im-super-good-at-css-and-i-dont-recommend-the-cascade-dont-@-me',
    title: 'Simon Taggart — I’m super good at CSS and I don’t recommend the cascade, don’t @ me',
  },
];

describe('Every route', () => {
  for (const { heading, path, title } of routes) {
    it(`renders one heading, one main and a distinct title at ${path}`, () => {
      cy.visit(path);
      cy.get('h1').should('have.length', 1).and('have.text', heading);
      cy.get('main#main').should('have.length', 1).and('have.attr', 'tabindex', '-1');
      cy.title().should('equal', title);
      cy.get('a[href="#main"]').should('exist');
      cy.get('footer a[href*="github.com/SiTaggart"]').should('exist');
    });

    it(`fits a 320px viewport at ${path}`, () => {
      cy.viewport(320, 800);
      cy.visit(path);
      cy.document().then((document_) => {
        const { clientWidth, scrollWidth } = document_.documentElement;

        expect(scrollWidth, `${path} horizontal overflow`).to.be.at.most(clientWidth);
      });
    });
  }

  it('points og:url at the case study path', () => {
    cy.visit('/work/paste');
    cy.get('head meta[property="og:url"]')
      .should('have.length', 1)
      .and(([element]) => {
        expect(element.getAttribute('content')).to.match(/\/work\/paste$/);
      });
  });

  it('gives every route a different title', () => {
    expect(new Set(routes.map(({ title }) => title)).size).to.equal(routes.length);
  });
});

describe('Homepage', () => {
  const consoleErrors: Array<string> = [];

  beforeEach(() => {
    consoleErrors.length = 0;
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win.console, 'error').callsFake((...args: Array<unknown>) => {
          consoleErrors.push(args.map(String).join(' '));
        });
      },
    });
  });

  it('lists the sections in the planned order', () => {
    const sections = ['Selected work', 'Experience', 'Writing', 'About', 'Contact'];

    cy.get('main section h2').should('have.length', sections.length);
    cy.get('main section h2').each((element, index) => {
      expect(element.text()).to.equal(sections[index]);
    });
  });

  it('links each case study from selected work', () => {
    cy.get('#work')
      .parents('section')
      .within(() => {
        cy.get('a[href="/work/sesco"]').should('exist');
        cy.get('a[href="/work/paste"]').should('exist');
        cy.get('a[href="/work/accessible-systems"]').should('exist');
        cy.contains('a', 'Read case study').should('have.length.at.least', 1);
      });
  });

  it('lists four pieces of writing', () => {
    cy.get('#writing').parents('section').find('li').should('have.length', 4);
  });

  it('hydrates without console errors', () => {
    cy.contains('h1', 'Simon Taggart');
    cy.wait(1000);
    cy.then(() => {
      expect(consoleErrors, consoleErrors.join('\n')).to.have.length(0);
    });
  });
});

const clientSideStamp = 'clientSideStamp';

function hasReactClickHandler(element: HTMLElement): boolean {
  const propsKey = Object.keys(element).find((key) => key.startsWith('__reactProps'));

  if (propsKey === undefined) {
    return false;
  }

  const props: unknown = (element as unknown as Record<string, unknown>)[propsKey];

  return typeof props === 'object' && props !== null && 'onClick' in props;
}

function visitHydrated(path: string): void {
  cy.visit(path);
  cy.get('a[href^="/"]')
    .first()
    .should(([element]) => {
      expect(hasReactClickHandler(element), 'the router hydrated its links').to.equal(true);
    });
  cy.window().then((win) => {
    (win as unknown as Record<string, unknown>)[clientSideStamp] = true;
  });
}

function expectPath(pathname: string, hash = ''): void {
  cy.window().its('location.pathname').should('equal', pathname);
  cy.window().its('location.hash').should('equal', hash);
}

function expectStayedClientSide(): void {
  cy.window().should((win) => {
    expect(
      (win as unknown as Record<string, unknown>)[clientSideStamp],
      'the page was not reloaded',
    ).to.equal(true);
  });
}

describe('Client-side navigation', () => {
  it('reaches the first case study link by keyboard and activates it', () => {
    visitHydrated('/');
    cy.get('body').then(([body]) => {
      const focusable = [
        ...body.querySelectorAll<HTMLElement>(
          'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ];

      expect(focusable[0], 'skip link comes first in the tab order').to.have.attr('href', '#main');
      expect(
        focusable.findIndex((element) => element.textContent.trim().startsWith('Read case study')),
        'the first case study link is in the tab order',
      ).to.be.greaterThan(0);
    });

    cy.contains('a', 'Read case study').first().focus().should('have.focus');
    cy.focused().should('have.attr', 'href', '/work/sesco');
    cy.focused().click();
    expectPath('/work/sesco');
    expectStayedClientSide();
    cy.focused().should('match', 'main#main');
    cy.window().its('scrollY').should('equal', 0);
    cy.contains('h1', 'SESCO trading platform');
  });

  it('moves focus to main and scrolls to the top after a link navigation', () => {
    visitHydrated('/');
    cy.scrollTo('bottom');
    cy.get('a[href="/work/paste"]').first().click();
    expectPath('/work/paste');
    expectStayedClientSide();
    cy.focused().should('match', 'main#main');
    cy.window().its('scrollY').should('equal', 0);
  });

  it('walks prev and next between case studies and back to selected work', () => {
    visitHydrated('/work/paste');
    cy.contains('nav a', 'SESCO trading platform').click();
    expectPath('/work/sesco');
    cy.contains('nav a', 'Paste and Twilio product unification').click();
    expectPath('/work/paste');
    cy.contains('nav a', 'Back to selected work').click();
    expectPath('/', '#work');
    cy.focused().should('have.attr', 'id', 'work');
    cy.get('#work').then(([heading]) => {
      expect(heading.getBoundingClientRect().top, 'the work section is in view').to.be.lessThan(80);
    });
    expectStayedClientSide();
  });

  it('restores the previous page on browser back', () => {
    visitHydrated('/');
    cy.get('a[href="/work/accessible-systems"]').first().click();
    cy.contains('h1', 'Accessible product systems');
    cy.go('back');
    expectPath('/');
    cy.contains('h1', 'Simon Taggart');
    expectStayedClientSide();
  });

  it('serves a not found page for a retired post', () => {
    cy.visit('/posts/2021-01-01-2020-year-in-review', { failOnStatusCode: false });
    cy.contains('h1', 'Nothing here.');
  });
});
