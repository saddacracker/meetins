describe('meetins-ui-shared: MeetinsUiShared component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=meetinsuishared--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to MeetinsUiShared!');
    });
});
