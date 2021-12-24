describe('meetins-ui-shared: MUserListItem component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=muserlistitem--primary&args=id:69;name:Fart Machine;email:farting@home.today;'));
    
    it('should render the primary text', () => {
      cy.get('.MuiListItemText-primary').should('contain', 'Fart Machine');
    });
    it('should render the secondary text', () => {
      cy.get('.MuiListItemText-secondary').should('contain', 'Fart Machine - farting@home.today');
    });
});
