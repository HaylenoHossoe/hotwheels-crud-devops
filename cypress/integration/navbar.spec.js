// cypress/integration/navbar.spec.js

describe('Navbar Component', () => {
    it('Displays navigation links correctly', () => {
      cy.visit('/');
      cy.get('a[href="/"]').contains('Home');
      cy.get('a[href="/about"]').contains('Sobre');
      cy.get('a[href="/cars"]').contains('Carros');
      cy.get('a[href="/add"]').contains('+Carro');
    });
  });
  