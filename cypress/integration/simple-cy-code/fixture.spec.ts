/// <reference types="Cypress" />


describe('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/home');
    cy.fixture('keychain').as('user');
  })

  it('Login', () => {
    // cy.contains('Login');
    cy.get('h1').contains('Login');
    cy.url().should('include', 'home');
    cy.get('@user').then((user) => {
        cy.get('#exampleInputEmail1').type(user.email);
        cy.get('#exampleInputPassword1').type(user.password);
    })
    cy.get('#exampleCheck1').check();
    cy.get('.btn-primary').click();
  })

})
