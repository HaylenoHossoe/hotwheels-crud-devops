// cypress/integration/carsList.spec.js

describe('CarsList Component', () => {
    beforeEach(() => {
      cy.visit('/cars');
    });
  
    it('Displays list of cars correctly', () => {
      cy.contains('Lista de Carros');
      cy.get('input').should('have.attr', 'placeholder', 'Buscar carro...');
      cy.contains('Adicionar Carro');
      // Verifique se pelo menos um carro é exibido na lista
      cy.get('ul li').should('have.length.greaterThan', 0);
    });
  
    it('Deletes a car successfully', () => {
      // Suponha que haja um carro na lista com o botão de exclusão
      cy.get('button[aria-label="delete"]').first().click();
      cy.contains('Carro excluído com sucesso!');
      // Verifique se o carro foi removido da lista
      cy.get('ul li').should('have.length.lessThan', 1);
    });
  
    it('Searches for a car successfully', () => {
      // Digite um termo de pesquisa e pressione o botão de busca
      cy.get('input').type('Test Car');
      cy.contains('Buscar').click();
      // Verifique se pelo menos um carro corresponde ao termo de pesquisa
      cy.get('ul li').should('have.length.greaterThan', 0);
    });
  });
  