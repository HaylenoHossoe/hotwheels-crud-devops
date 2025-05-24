describe('Teste do componente CarDetail.js', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/car/1');
    });
  
    it('Exibe os detalhes do carro com o ID 1 corretamente', () => {
      cy.contains('Detalhes do Carro');
      cy.contains('ID:');
      cy.contains('Nome:');
      cy.contains('Marca:');
      cy.contains('Cor:');
      cy.contains('Ano:');
    });
  
    it('Redireciona para o componente NotFound.js se o carro com o ID 999 não existe', () => {
      cy.visit('http://localhost:3000/car/999');
      cy.contains('Carro não encontrado');
//      cy.contains('Carro inexistente ou excluído, procure outro carro.');
    });
  });
  