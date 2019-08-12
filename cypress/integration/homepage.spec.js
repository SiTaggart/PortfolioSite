describe('Homepage', function() {
  describe('renders', () => {
    it('should load', function() {
      cy.visit('/');
      cy.document()
        .should('have.property', 'title')
        .and('eq', 'Simon Taggart - Front-End Engineer and Designer');
      cy.percySnapshot('Homepage snapshot');
    });
  });
});

describe('Posts list', function() {
  describe('renders', () => {
    it('should load', function() {
      cy.visit('/posts/');
      cy.document()
        .should('have.property', 'title')
        .and('eq', 'Simon Taggart - Front-End Engineer and Designer');
      cy.percySnapshot('Posts list snapshot');
    });
  });
});
