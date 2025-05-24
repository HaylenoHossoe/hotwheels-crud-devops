// cypress/integration/useCars.spec.js

describe('useCars Hook', () => {
    it('Fetches cars data successfully', () => {
      cy.request('http://localhost:5000/cars')
        .then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.have.length.greaterThan(0);
        });
    });
  
    it('Adds a new car successfully', () => {
      const newCar = {
        name: 'Test Car',
        brand: 'Test Brand',
        color: 'Test Color',
        year: '2022',
      };
      cy.request('POST', 'http://localhost:5000/cars', newCar)
        .then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body.name).to.equal(newCar.name);
          expect(response.body.brand).to.equal(newCar.brand);
          expect(response.body.color).to.equal(newCar.color);
          expect(response.body.year).to.equal(newCar.year);
        });
    });
  
    it('Deletes a car successfully', () => {
      // Suponha que haja um carro com ID 1 na lista para teste
      cy.request('DELETE', 'http://localhost:5000/cars/1')
        .then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body.success).to.be.true;
        });
    });
  
    // Testes adicionais para edição de carro podem ser escritos semelhantemente, mas exigiriam primeiro a adição de um carro para depois editá-lo.
  });
  