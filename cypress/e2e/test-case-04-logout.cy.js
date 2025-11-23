/// <reference types="cypress" />


describe('Test Case 4: Logout User', () => {
  beforeEach(() => {
    cy.visit('https://automationexercise.com');
  });

  it('Should logout user successfully', () => {
    // Lê as credenciais salvas pelo teste 1 e realiza login antes de logout
    cy.readFile('cypress/fixtures/user-credentials.json').then((credentials) => {
      // Verifica que a página inicial está visível com sucesso
      cy.url().should('eq', 'https://automationexercise.com/');

      // Clica no botão 'Signup / Login'
      cy.contains('Signup / Login').click();

      // Verifica que 'Login to your account' está visível
      cy.get('.login-form h2').should('be.visible').and('contain', 'Login to your account');

      // Insere email e senha corretos do usuário registrado
      cy.get('[data-qa="login-email"]').type(credentials.email);
      cy.get('[data-qa="login-password"]').type(credentials.password);

      // Clica no botão 'login'
      cy.get('[data-qa="login-button"]').click();

      // Verifica que 'Logged in as username' está visível
      cy.get('a').contains('Logged in as').should('be.visible');

      // Clica no botão 'Logout'
      cy.contains('Logout').click();

      // Verifica que o usuário foi navegado para a página de login
      cy.url().should('include', '/login');
      cy.get('.login-form h2').should('be.visible').and('contain', 'Login to your account');
    });
  });
});
