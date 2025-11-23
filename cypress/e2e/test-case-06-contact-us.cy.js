/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Test Case 6: Contact Us Form', () => {
  beforeEach(() => {
    cy.visit('https://automationexercise.com');
  });

  it('Should submit contact us form successfully', () => {
    // Verifica que a página inicial está visível com sucesso
    cy.url().should('eq', 'https://automationexercise.com/');
    
    // Clica no botão 'Contact Us'
    cy.contains('Contact us').click();
    
    // Verifica que 'GET IN TOUCH' está visível
    cy.get('.contact-form h2').should('be.visible').and('contain', 'Get In Touch');
    
    // Insere nome, email, assunto e mensagem
    cy.get('[data-qa="name"]').type(faker.person.fullName());
    cy.get('[data-qa="email"]').type(faker.internet.email());
    cy.get('[data-qa="subject"]').type(faker.lorem.sentence());
    cy.get('[data-qa="message"]').type(faker.lorem.paragraph());
    
    // Faz upload de arquivo
    cy.get('input[name="upload_file"]').selectFile('cypress/fixtures/example.json');
    
    // Clica no botão 'Submit'
    cy.get('[data-qa="submit-button"]').click();
    
    // Clica no botão OK do alerta
    cy.on('window:confirm', () => true);
    
    // Verifica que a mensagem de sucesso 'Success! Your details have been submitted successfully.' está visível
    cy.get('.status').should('contain', 'Success! Your details have been submitted successfully.');
    
    // Clica no botão 'Home' e verifica que retornou para a página inicial com sucesso
    cy.contains('Home').click();
    cy.url().should('eq', 'https://automationexercise.com/');
  });
});
