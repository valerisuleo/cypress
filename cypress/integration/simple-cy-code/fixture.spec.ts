
describe('Actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/home');
        cy.fixture('keychain').as('user');
    })

    it('Login', () => {
        cy.get('@user').then((user: any) => {
            cy.get('#exampleInputEmail1').type(user.email);
            cy.get('#exampleInputPassword1').type(user.password);
        });
    });
});
