/// <reference types="Cypress" />

context('Network Requests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/asso')
  })

  it('cy.route() - route responses to matching requests', () => {

    cy.server();

    cy.route('GET', 'propertys').as('getComment');

    cy.get('.network-btn').click();

    cy.wait('@getComment');

    cy.get('@getComment').then((xhr: any) => {
      if (xhr.status !== 200) {
        cy.get('h3').contains('error');
      } else {
        cy.get('.lis-container');
      }
    });
  });
});
