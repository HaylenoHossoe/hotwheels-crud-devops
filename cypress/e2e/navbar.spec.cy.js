describe('Teste do componente Navbar.js', () => {
    it('Exibe a navegação corretamente', () => {
      cy.visit('http://localhost:3000/');
      cy.get('a[href="/"]').contains('Home');
      cy.get('a[href="/about"]').contains('Sobre');
      cy.get('a[href="/cars"]').contains('Carros');
      cy.get('a[href="/add"]').contains('+Carro');
    });
  });
  