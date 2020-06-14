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
      cy.get('h2').eq(0).click();
      cy.percySnapshot('Post snapshot');
    });
  });
});
/* eslint-enable jest/expect-expect */
