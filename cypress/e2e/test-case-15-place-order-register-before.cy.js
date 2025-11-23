/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Test Case 15: Place Order: Register before Checkout', () => {
  beforeEach(() => {
    cy.visit('https://automationexercise.com');
  });

  it('Should place order after registering before checkout', () => {
    // Verifica que a página inicial está visível com sucesso
    cy.url().should('eq', 'https://automationexercise.com/');
    
    // Clica no botão 'Signup / Login'
    cy.contains('Signup / Login').click();
    
    // Preenche todos os detalhes no Signup e cria a conta
    const userName = faker.person.fullName();
    const userEmail = faker.internet.email();
    cy.get('[data-qa="signup-name"]').type(userName);
    cy.get('[data-qa="signup-email"]').type(userEmail);
    cy.get('[data-qa="signup-button"]').click();
    
    // Preenche informações da conta
    cy.get('#id_gender1').check();
    cy.get('[data-qa="password"]').type('TestPassword123!');
    cy.get('[data-qa="days"]').select('15');
    cy.get('[data-qa="months"]').select('March');
    cy.get('[data-qa="years"]').select('1990');
    cy.get('#newsletter').check();
    cy.get('#optin').check();
    
    // Preenche informações de endereço
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
    cy.get('[data-qa="create-account"]').click();
    
    // Verifica que 'ACCOUNT CREATED!' está visível e clica no botão 'Continue'
    cy.get('[data-qa="account-created"]').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
    
    // Verifica que 'Logged in as username' está visível no topo
    cy.get('a').contains('Logged in as').should('be.visible');
    
    // Adiciona produtos ao carrinho
    cy.contains('Products').click();
    cy.get('.features_items .product-image-wrapper').first().within(() => {
      cy.get('.add-to-cart').first().click();
    });
    cy.contains('Continue Shopping').click();
    
    // Clica no botão 'Cart'
    cy.contains('Cart').click();
    
    // Verifica que a página do carrinho está exibida
    cy.url().should('include', '/view_cart');
    
    // Clica em Proceed To Checkout
    cy.contains('Proceed To Checkout').click();
    
    // Verifica os Detalhes do Endereço e Revisa Seu Pedido
    cy.get('.checkout-information').should('be.visible');
    cy.get('#address_delivery').should('be.visible');
    cy.get('#address_invoice').should('be.visible');
    
    // Insere descrição na área de comentário e clica em 'Place Order'
    cy.get('textarea.form-control').type('Please deliver between 9 AM and 5 PM');
    cy.contains('Place Order').click();
    
    // Insere detalhes de pagamento: Nome no cartão, Número do cartão, CVC, Data de expiração
    cy.get('[data-qa="name-on-card"]').type(faker.person.fullName());
    cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber('################'));
    cy.get('[data-qa="cvc"]').type('123');
    cy.get('[data-qa="expiry-month"]').type('12');
    cy.get('[data-qa="expiry-year"]').type('2027');
    
    // Clica no botão 'Pay and Confirm Order'
    cy.get('[data-qa="pay-button"]').click();
    
    // Verifica mensagem de sucesso 'Your order has been placed successfully!'
    cy.get('[data-qa="order-placed"]').should('be.visible');
    
    // Clica no botão 'Delete Account'
    cy.contains('Delete Account').click();
    
    // Verifica que 'ACCOUNT DELETED!' está visível e clica no botão 'Continue'
    cy.get('[data-qa="account-deleted"]').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
  });
});
