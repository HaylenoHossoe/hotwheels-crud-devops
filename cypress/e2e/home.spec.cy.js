describe('Teste do componente Home.js', () => {
    it('Visita a página Home e verifica o conteúdo', () => {
      cy.visit('http://localhost:3000/');
      cy.contains('HotWheels');
      cy.contains('Bem-vindo à coleção de HotWheels!');
    });
  });
  