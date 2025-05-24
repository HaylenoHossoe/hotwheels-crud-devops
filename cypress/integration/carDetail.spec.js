// cypress/integration/carDetail.spec.js

describe('CarDetail Component', () => {
    beforeEach(() => {
      cy.visit('/car/1'); // Supondo que o carro com ID 1 exista para os testes
    });
  
    it('Displays car details correctly', () => {
      cy.contains('Detalhes do Carro');
      cy.contains('Nome:');
      cy.contains('Marca:');
      cy.contains('Cor:');
      cy.contains('Ano:');
    });
  
    it('Redirects to not found page if car does not exist', () => {
      cy.visit('/car/999'); // Supondo que o carro com ID 999 não exista
      cy.contains('Carro não encontrado');
      cy.contains('Carro inexistente ou excluído, procure outro carro.');
    });
  });
  