interface RouteCase {
  heading: string;
  path: string;
  title: string;
}

const routes: Array<RouteCase> = [
  { heading: 'Simon Taggart', path: '/', title: 'Simon Taggart — Product Engineer' },
  {
    heading: 'Paste and Twilio product unification',
    path: '/work/paste',
    title: 'Simon Taggart — Paste and Twilio product unification',
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
    const sections = ['Selected work', 'Experience', 'About', 'Contact'];

    cy.get('main section h2').should('have.length', sections.length);
    cy.get('main section h2').each((element, index) => {
      expect(element.text()).to.equal(sections[index]);
    });
  });

  it('links the Paste case study from selected work', () => {
    cy.get('#work')
      .parents('section')
      .within(() => {
        cy.get('a[href="/work/paste"]').should('exist');
        cy.get('a[href="/work/sesco"]').should('not.exist');
        cy.get('a[href="/work/accessible-systems"]').should('not.exist');
        cy.contains('a', 'Read case study').should('have.length', 1);
      });
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
  it('reaches the case study link by keyboard and activates it', () => {
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
        'the case study link is in the tab order',
      ).to.be.greaterThan(0);
    });

    cy.contains('a', 'Read case study').first().focus().should('have.focus');
    cy.focused().should('have.attr', 'href', '/work/paste');
    cy.focused().click();
    expectPath('/work/paste');
    expectStayedClientSide();
    cy.focused().should('match', 'main#main');
    cy.window().its('scrollY').should('equal', 0);
    cy.contains('h1', 'Paste and Twilio product unification');
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

  it('returns to selected work from the case study', () => {
    visitHydrated('/work/paste');
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
    cy.get('a[href="/work/paste"]').first().click();
    cy.contains('h1', 'Paste and Twilio product unification');
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
