/// <reference types="cypress" />

describe('Test Case 9: Search Product', () => {
  beforeEach(() => {
    cy.visit('https://automationexercise.com');
  });

  it('Should search for product and verify results', () => {
    // Verifica que a página inicial está visível com sucesso
    cy.url().should('eq', 'https://automationexercise.com/');
    
    // Clica no botão 'Products'
    cy.contains('Products').click();
    
    // Verifica que o usuário foi navegado para a página ALL PRODUCTS com sucesso
    cy.url().should('include', '/products');
    cy.get('.title').should('contain', 'All Products');
    
    // Insere nome do produto no campo de busca e clica no botão de pesquisar
    cy.get('#search_product').type('Jeans');
    cy.get('#submit_search').click();
    
    // Verifica que 'SEARCHED PRODUCTS' está visível
    cy.get('.title').should('contain', 'Searched Products');
    
    // Verifica que todos os produtos relacionados à busca estão visíveis
    cy.get('.features_items').should('be.visible');
    cy.get('.single-products').should('have.length.greaterThan', 0);
    
    // Verifica que os resultados da busca contêm o termo pesquisado
    cy.get('.single-products').each(($product) => {
      cy.wrap($product).find('.productinfo p').invoke('text').should('match', /jeans/i);
    });
  });
});
