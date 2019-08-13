/// <reference types="Cypress" />

const login = () => {
  cy.get('#exampleInputEmail1').clear();
  cy.get('#exampleInputEmail1').type('mamma@ga.co');
  cy.get('#exampleInputPassword1').type('password');
  cy.get('.btn-primary').click();
}


context('Network Requests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/home')
  })

  it('cy.route() - route responses to matching requests', () => {
    login();

    cy.get('h1').contains('async works!');

    cy.server();

    cy.route('GET', 'birds').as('getBirdsIndex');

    cy.get('.network-btn').click();

    cy.wait('@getBirdsIndex');

    cy.get('@getBirdsIndex').then((xhr: any) => {
      console.log(xhr)
      if (xhr.status !== 200) {
        cy.get('h3').contains('error');
      } else {
        cy.get('.lis-container');
      }
    });
  });
});
