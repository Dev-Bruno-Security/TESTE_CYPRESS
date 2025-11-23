/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Test Case 10: Verify Subscription in home page', () => {
  beforeEach(() => {
    cy.visit('https://automationexercise.com');
  });

  it('Should verify subscription on home page', () => {
    // Verifica que a página inicial está visível com sucesso
    cy.url().should('eq', 'https://automationexercise.com/');
    
    // Rola a página até o rodapé
    cy.get('footer').scrollIntoView();
    
    // Verifica o texto 'SUBSCRIPTION'
    cy.get('footer').contains('Subscription').should('be.visible');
    
    // Insere endereço de email no campo e clica no botão de seta
    cy.get('footer input[type="email"]').should('be.visible').type(faker.internet.email());
    cy.get('footer button[type="submit"]').click();
    
    // Verifica que a mensagem de sucesso 'You have been successfully subscribed!' está visível
    cy.get('.alert-success').should('be.visible').and('contain', 'You have been successfully subscribed!');
  });
});
