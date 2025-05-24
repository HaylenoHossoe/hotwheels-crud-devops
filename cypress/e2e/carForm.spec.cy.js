describe('Teste do componente CarForm.js', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/add');
  });

  it('Adiciona um novo carro com sucesso', () => {
    cy.get('input[name="name"]').type('Test Car');
    cy.get('input[name="brand"]').type('Test Brand');
    cy.get('input[name="color"]').type('Test Color');
    cy.get('input[name="year"]').type('2022');
    cy.contains('Incluir Carro').click();
    cy.contains('Carro adicionado com sucesso!');
  });

  it('Mostra uma mensagem de erro se um campo estiver vazio', () => {
    cy.contains('Incluir Carro').click();
    cy.on('window:alert', (str) => {
//      expect(str).to.equal('Os campos não podem estar vazios ou preenchidos com espaços. Por favor, preencha todos os campos');

      expect(str).to.equal('Preencha este campo.');
    });
  });
});
