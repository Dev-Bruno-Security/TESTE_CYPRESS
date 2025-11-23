/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Test Case 5: Register User with existing email', () => {
  beforeEach(() => {
    cy.visit('https://automationexercise.com');
  });

  it('Should display error when registering with existing email', () => {
    // Verifica que a página inicial está visível com sucesso
    cy.url().should('eq', 'https://automationexercise.com/');
    
    // Clica no botão 'Signup / Login'
    cy.contains('Signup / Login').click();
    
    // Verifica que 'New User Signup!' está visível
    cy.get('.signup-form h2').should('be.visible').and('contain', 'New User Signup!');
    
    // Insere nome e email já registrado
    cy.get('[data-qa="signup-name"]').type(faker.person.fullName());
    cy.get('[data-qa="signup-email"]').type('testuser@example.com');
    
    // Clica no botão 'Signup'
    cy.get('[data-qa="signup-button"]').click();
    
    // Verifica que o erro 'Email Address already exist!' está visível
    cy.get('p').contains('Email Address already exist!').should('be.visible');
  });
});
