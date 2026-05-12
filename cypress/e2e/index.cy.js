/* eslint-disable jest/expect-expect */
describe('Homepage', () => {
  describe('renders', () => {
    it('should load', () => {
      cy.visit('http://localhost:3000');
      cy.document().should('have.property', 'title').and('eq', 'Hi | Simon Taggart');
    });
    it('should load posts', () => {
      cy.visit('http://localhost:3000/posts');
      cy.document().should('have.property', 'title').and('eq', 'Posts | Simon Taggart');
      cy.contains('h2 > a', '2020 - Year in review').click();
      cy.document()
        .should('have.property', 'title')
        .and('eq', '2020 - Year in review | Simon Taggart');
    });
    it('should load a post', () => {
      cy.visit('http://localhost:3000/');
      cy.get('a[href="/posts"]').click();
      cy.contains('h2 > a', 'The Living Style Guide Pattern Lab').click();
      cy.contains('h1', 'The Living Style Guide Pattern Lab');
    });
  });
});
/* eslint-enable jest/expect-expect */
