describe('Teste do componente About.js', () => {
    it('Visita a página Sobre e verifica se há conteúdo', () => {
      cy.visit('http://localhost:3000/about');
      cy.contains('Sobre');
      cy.contains('Esta é uma aplicação para um CRUD de carros HotWheels');
    });
  });
  