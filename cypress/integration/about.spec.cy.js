// cypress/integration/about.spec.js

describe('About Component', () => {
    it('Visits the about page and checks for the existence of content', () => {
      cy.visit('/about');
      cy.contains('Sobre');
      cy.contains('Esta é uma aplicação para um CRUD de carros HotWheels');
    });
  });
  