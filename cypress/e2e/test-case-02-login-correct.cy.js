/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Test Case 2: Login User with correct email and password', () => {
  beforeEach(() => {
    cy.visit('https://automationexercise.com');
  });

  it('Should login user with correct credentials', () => {
    // Lê as credenciais criadas no teste 1
    cy.readFile('cypress/fixtures/user-credentials.json').then((credentials) => {
      // Verifica que a página inicial está visível com sucesso
      cy.url().should('eq', 'https://automationexercise.com/');
      
      // Clica no botão 'Signup / Login'
      cy.contains('Signup / Login').click();
      
      // Verifica que 'Login to your account' está visível
      cy.get('.login-form h2').should('be.visible').and('contain', 'Login to your account');
      
      // Insere email e senha corretos do teste 1
      cy.get('[data-qa="login-email"]').type(credentials.email);
      cy.get('[data-qa="login-password"]').type(credentials.password);
      
      // Clica no botão 'login'
      cy.get('[data-qa="login-button"]').click();
      
      // Verifica que 'Logged in as username' está visível
      cy.get('a').contains('Logged in as').should('be.visible');
    });
  });
});
