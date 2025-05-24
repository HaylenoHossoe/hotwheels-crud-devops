const { Button } = require("@mui/material");

describe('Teste do componente CarsList.js', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/cars');
    });
  
    it('Exibe a lista de carros corretamente', () => {
      cy.contains('Lista de Carros');
      cy.contains('Adicionar Carro');
      cy.get('ul li').should('have.length.greaterThan', 0);
    });
  
    it('Exclui um carro com sucesso', () => {
      cy.get('button[aria-label="delete"]').last().click();
    });
  
    it('Busca por um carro com sucesso', () => {
      cy.get('input').type('Mustang');
      cy.contains('Buscar').click();
      cy.get('ul li').should('have.length.greaterThan', 0);
    });
  });
  