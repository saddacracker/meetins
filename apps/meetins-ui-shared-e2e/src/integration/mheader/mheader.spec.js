describe('meetins-ui-shared: MHeader component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=mheader--primary&args=title:Example Title;'));
    
    it('should render the component', () => {
      cy.get('h1.MuiTypography-root').should('contain', 'Example Title');
    });
});
