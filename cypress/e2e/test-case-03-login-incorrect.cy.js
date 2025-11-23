/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Test Case 3: Login User with incorrect email and password', () => {
  beforeEach(() => {
    cy.visit('https://automationexercise.com');
  });

  it('Should display error message with incorrect credentials', () => {
    // Verifica que a página inicial está visível com sucesso
    cy.url().should('eq', 'https://automationexercise.com/');
    
    // Clica no botão 'Signup / Login'
    cy.contains('Signup / Login').click();
    
    // Verifica que 'Login to your account' está visível
    cy.get('.login-form h2').should('be.visible').and('contain', 'Login to your account');
    
    // Insere email e senha incorretos
    cy.get('[data-qa="login-email"]').type(faker.internet.email());
    cy.get('[data-qa="login-password"]').type(faker.internet.password());
    
    // Clica no botão 'login'
    cy.get('[data-qa="login-button"]').click();
    
    // Verifica que o erro 'Your email or password is incorrect!' está visível
    cy.get('p').contains('Your email or password is incorrect!').should('be.visible');
  });
});
