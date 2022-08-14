/* eslint-disable jest/expect-expect */
describe('Homepage', () => {
  describe('renders', () => {
    it('should load', () => {
      cy.visit('http://localhost:3000');
      cy.document().should('have.property', 'title').and('eq', 'Hi | Simon Taggart');
      cy.percySnapshot('Homepage snapshot');
    });
    it('should load posts', () => {
      cy.visit('http://localhost:3000/posts');
      cy.document().should('have.property', 'title').and('eq', 'Posts | Simon Taggart');
      cy.percySnapshot('Posts snapshot');
      cy.get('li:nth-child(1) h2 > a').click();
      cy.percySnapshot('Post snapshot');
    });
    it('should load a post', () => {
      cy.visit('http://localhost:3000/');
      cy.get('a[href="/posts"]').click();
      cy.get('li:nth-child(3) h2 > a').click();
      cy.percySnapshot('Post detailed snapshot');
    });
  });
});
/* eslint-enable jest/expect-expect */
