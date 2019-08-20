describe('Smoke Test Login Daal', () => {
  it('Visit main login page', () => {
    cy.visit('http://localhost:8077/login')
    cy.contains('Login')
    cy.contains('Login Daal');
  })

})
