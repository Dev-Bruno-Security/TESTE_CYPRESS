/// <reference types="cypress" />

describe('Test Case 8: Verify All Products and product detail page', () => {
  beforeEach(() => {
    cy.visit('https://automationexercise.com');
  });

  it('Should verify all products list and product detail page', () => {
    // Verifica que a página inicial está visível com sucesso
    cy.url().should('eq', 'https://automationexercise.com/');
    
    // Clica no botão 'Products'
    cy.contains('Products').click();
    
    // Verifica que o usuário foi navegado para a página ALL PRODUCTS com sucesso
    cy.url().should('include', '/products');
    cy.get('.title').should('contain', 'All Products');
    
    // A lista de produtos está visível e contém itens (usa wrapper principal de produto)
    cy.get('.features_items').should('be.visible');
    cy.get('.features_items .product-image-wrapper', { timeout: 10000 })
      .should('have.length.greaterThan', 0);

    // Dentro do primeiro produto, clicar no link 'View Product'
    cy.get('.features_items .product-image-wrapper').first().within(() => {
      cy.contains('View Product').click();
    });
    
    // Usuário é direcionado para a página de detalhes do produto
    cy.url().should('include', '/product_details/');
    
    // Verifica que os detalhes estão visíveis: nome do produto, categoria, preço, disponibilidade, condição, marca
    cy.get('.product-information h2').should('be.visible');
    cy.get('.product-information p').contains('Category:').should('be.visible');
    cy.get('.product-information span span').should('be.visible'); // Price
    cy.get('.product-information p').contains('Availability:').should('be.visible');
    cy.get('.product-information p').contains('Condition:').should('be.visible');
    cy.get('.product-information p').contains('Brand:').should('be.visible');
  });
});
