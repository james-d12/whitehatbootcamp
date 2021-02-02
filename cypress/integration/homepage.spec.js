describe('Restaurant tests', () => {

  it('finds the restaurant website', () => {
    cy.visit('https://localhost:443');
  })

  it('opens the Add Restaurant page', () => {
    cy.visit('https://localhost:443/restaurants/add');
    
    cy.get('#name').type('Mcdonalds')
    cy.get('#image').type('https://i1.wp.com/www.eatthis.com/wp-content/uploads/2018/12/the-golden-mcdonalds-arch.jpg?fit=1200%2C879&ssl=1')
    cy.get('#add-restaurant-button').click()

    cy.visit('https://localhost:443')
    cy.get('#Mcdonalds-9').should('exist')
  })

  it('opens 1st restaurant page', () => {
    cy.visit('https://localhost:443/restaurants/1');
  })

})