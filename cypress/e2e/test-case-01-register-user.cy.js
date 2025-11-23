/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Test Case 1: Register User', () => {
  beforeEach(() => {
    cy.visit('https://automationexercise.com');
  });

  it('Should register a new user successfully', () => {
    // Verifica que a página inicial está visível com sucesso
    cy.url().should('eq', 'https://automationexercise.com/');
    
    // Clica no botão 'Signup / Login'
    cy.contains('Signup / Login').click();
    
    // Verifica que 'New User Signup!' está visível
    cy.get('.signup-form h2').should('be.visible').and('contain', 'New User Signup!');
    
    // Insere nome e endereço de email
    const userName = faker.person.fullName();
    const userEmail = faker.internet.email();
    cy.get('[data-qa="signup-name"]').type(userName);
    cy.get('[data-qa="signup-email"]').type(userEmail);
    
    // Clica no botão 'Signup'
    cy.get('[data-qa="signup-button"]').click();
    
    // Verifica que 'ENTER ACCOUNT INFORMATION' está visível
    cy.get('.title').should('contain', 'Enter Account Information');
    
    // Preenche detalhes: Título, Nome, Email, Senha, Data de nascimento
    cy.get('#id_gender1').check(); // Mr.
    cy.get('[data-qa="password"]').type('TestPassword123!');
    cy.get('[data-qa="days"]').select('15');
    cy.get('[data-qa="months"]').select('March');
    cy.get('[data-qa="years"]').select('1990');
    
    // Marca checkbox 'Sign up for our newsletter!'
    cy.get('#newsletter').check();
    
    // Marca checkbox 'Receive special offers from our partners!'
    cy.get('#optin').check();
    
    // Preenche detalhes: Primeiro nome, Último nome, Empresa, Endereço, Endereço2, País, Estado, Cidade, CEP, Número de celular
    cy.get('[data-qa="first_name"]').type(faker.person.firstName());
    cy.get('[data-qa="last_name"]').type(faker.person.lastName());
    cy.get('[data-qa="company"]').type(faker.company.name());
    cy.get('[data-qa="address"]').type(faker.location.streetAddress());
    cy.get('[data-qa="address2"]').type(faker.location.secondaryAddress());
    cy.get('[data-qa="country"]').select('United States');
    cy.get('[data-qa="state"]').type(faker.location.state());
    cy.get('[data-qa="city"]').type(faker.location.city());
    cy.get('[data-qa="zipcode"]').type(faker.location.zipCode('#####'));
    cy.get('[data-qa="mobile_number"]').type(faker.phone.number('##########'));
    
    // Clica no botão 'Create Account'
    cy.get('[data-qa="create-account"]').click();
    
    // Verifica que 'ACCOUNT CREATED!' está visível
    cy.get('[data-qa="account-created"]').should('be.visible');
    cy.get('.title').should('contain', 'Account Created!');
    
    // Clica no botão 'Continue'
    cy.get('[data-qa="continue-button"]').click();
    
    // Verifica que 'Logged in as username' está visível
    cy.get('a').contains('Logged in as').should('be.visible');
    
    // Salva as credenciais para uso no teste 2
    cy.writeFile('cypress/fixtures/user-credentials.json', {
      email: userEmail,
      password: 'TestPassword123!',
      name: userName
    });
  });
});
