describe('Teste do componente NotFound.js', () => {
    it('Exibe a mensagem "Carro não encontrado"', () => {
      cy.visit('http://localhost:3000/not-found');
      cy.contains('Carro não encontrado');
      cy.contains('Carro inexistente ou excluído, procure outro carro.');
    });
  });
  