// cypress/integration/carForm.spec.js

describe('CarForm Component', () => {
    beforeEach(() => {
      cy.visit('/add'); // Para testar a adição de um novo carro
    });
  
    it('Adds a new car successfully', () => {
      cy.get('input[name="name"]').type('Test Car');
      cy.get('input[name="brand"]').type('Test Brand');
      cy.get('input[name="color"]').type('Test Color');
      cy.get('input[name="year"]').type('2022');
      cy.contains('Adicionar Carro').click();
      cy.contains('Carro adicionado com sucesso!');
    });
  
    it('Displays error message if fields are empty', () => {
      cy.contains('Adicionar Carro').click();
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Os campos não podem estar vazios ou preenchidos com espaços. Por favor, preencha todos os campos');
      });
    });
  
    // Testes para edição de carro podem ser escritos semelhantemente, mas exigiria navegar para a página de edição e preencher os campos com os valores existentes do carro a ser editado.
  });
  