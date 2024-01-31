// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('validator', (texto) => {

    cy.get('.text-red-600 > div').should('be.visible').and('contain', texto)
  
  });

Cypress.Commands.add('login', () => {

  const email = "logintest@gmail.com";
  const senha = "test123@"

  cy.session([email,senha],()=>{
    cy.visit('http://localhost:4200/collaborator-signin');
    cy.get('#email').type(email);
    cy.get('#password').type(senha);
    cy.contains('button', 'Efetuar Login').click()

    cy.url().should('include', 'http://localhost:4200/dashboard/projetos');
    
  })


});
