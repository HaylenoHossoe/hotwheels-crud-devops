// cypress/integration/home.spec.js

describe('Home Component', () => {
    it('Visits the homepage and checks for the existence of content', () => {
      cy.visit('/');
      cy.contains('HotWheels');
      cy.contains('Bem-vindo à coleção de HotWheels!');
    });
  });
  