/// <reference types="Cypress" />


const requestTimeout = 5000;

describe('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/login')
  })

  it('Login', () => {
    // cy.contains('Login');
    cy.get('h1').contains('Login');
    cy.url().should('include', 'login');
    cy.get('#exampleInputEmail1').type('em@ga.co').wait(2500);
    cy.get('#exampleInputEmail1').clear();
    cy.get('#exampleInputEmail1').type('mamma@ga.co');
    cy.get('#exampleInputPassword1').type('password');
    cy.get('#exampleCheck1').check();
    cy.get('.btn-primary').click();
  })

  // it('Cypress advanced commands', () => {
  //     // find table with all rows
  //     cy.get('.table').find('tr')
  //     // check for Mark and get its parent
  //     .contains('Mark').parent()
  //     // get its associated Benefit and then click
  //     .contains('Benefits').click();
  // })
  //
  // it('Cypress advanced commands', () => {
  //     cy.contains('Employees').click();
  //     // find table with all rows
  //     cy.get('.table')
  //     // find td inside tr
  //     .find('tr > td')
  //     // check for Jacob and get its parent
  //     .contains('Jacob').parent()
  //     // get its associated Benefit and then click
  //     .contains('Benefit').click();
  // })
  //
  // it('Access variables from outside', () => {
  //   cy.get('.btn-primary')
  //   .then((el) => {
  //       const btn = el.text();
  //       console.log(btn);
  //   });
  // })
  //
  // it('Access variables from outside', () => {
  //     cy.get('.btn-primary')
  //     .then((btn) => {
  //         return btn.text();
  //     }).as('btnText');
  //
  //     cy.get('@btnText')
  //     .then((string) => {
  //         expect(string).is.eql('Submit');
  //     });
  // });
  //
  // it('Access variables from outside', () => {
  //     cy.get('.btn-primary').invoke('text').as('btnText');
  //     cy.get('@btnText')
  //     .then((string) => {
  //         expect(string).is.eql('Submit');
  //     });
  // });
  //
  // it('Working with UI elements', () => {
  //     cy.get('.table').find('tr').as('rows');
  //     cy.get('@rows')
  //     .then((rows) => {
  //         cy.wrap(rows).click({multiple: true});
  //     });
  // });
  //
  // // it('Understanding Cypress Wrap Commands', () => {
  // //     cy.wrap({ name: 'Hulk'})
  // //     .should('have.property', 'name').and('eq', 'Hulk');
  // // });
  //
  // it.only('Understanding Cypress Wrap Commands', () => {
  //     cy.get('.table').find('tr > td')
  //     .then((td) => {
  //         cy.wrap(td).contains('Jacob')
  //         .invoke('wrap').parent()
  //         .contains('Benefit').click();
  //     });
  // });








})
