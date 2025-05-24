// cypress/integration/notFound.spec.js

describe('NotFound Component', () => {
    it('Displays not found message correctly', () => {
      cy.visit('/not-found');
      cy.contains('Carro não encontrado');
      cy.contains('Carro inexistente ou excluído, procure outro carro.');
    });
  });
  