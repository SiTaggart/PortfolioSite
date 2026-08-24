describe('Homepage', () => {
  describe('renders', () => {
    it('should load', () => {
      cy.visit('/');
      cy.document().should('have.property', 'title').and('eq', 'Hi | Simon Taggart');
    });
    it('should load posts', () => {
      cy.visit('/posts');
      cy.document().should('have.property', 'title').and('eq', 'Posts | Simon Taggart');
      cy.get('footer a[href="https://www.twitter.com/SiTaggart"] svg').should('be.visible');
      cy.get('footer a[href="https://www.github.com/SiTaggart"] svg').should('be.visible');
      cy.get('footer a[href="https://www.linkedin.com/in/SiTaggart"] svg').should('be.visible');
      cy.contains('h2 > a', '2020 - Year in review').click();
      cy.document()
        .should('have.property', 'title')
        .and('eq', '2020 - Year in review | Simon Taggart');
    });
    it('should load a post', () => {
      cy.visit('/');
      cy.get('a[href="/posts"]').click();
      cy.contains('h2 > a', 'The Living Style Guide Pattern Lab').click();
      cy.contains('h1', 'The Living Style Guide Pattern Lab');
    });
  });
});
