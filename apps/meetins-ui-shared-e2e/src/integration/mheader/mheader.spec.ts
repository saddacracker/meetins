describe('meetins-ui-shared: MHeader component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=mheader--primary&args=title;'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to MHeader!');
    });
});
