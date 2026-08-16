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

  it('renders the name as the page heading', () => {
    cy.contains('h1', 'Simon Taggart');
  });

  it('renders every resume section', () => {
    const sections = ['Now', 'Experience', 'Selected work', 'About', 'Elsewhere'];

    cy.get('main section h2').should('have.length', sections.length);

    for (const section of sections) {
      cy.contains('main section h2', section);
    }
  });

  it('names the projects as they ship', () => {
    cy.contains('main h3', 'Are My Colors Accessible');
    cy.contains('main h3', 'Color Combos');
  });

  it('links to the source repository from the footer', () => {
    cy.get('footer a[href*="github.com/SiTaggart"]').should('be.visible');
  });

  it('hydrates without console errors', () => {
    cy.contains('h1', 'Simon Taggart');
    cy.wait(1000);
    cy.then(() => {
      expect(consoleErrors, consoleErrors.join('\n')).to.have.length(0);
    });
  });
});
