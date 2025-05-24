it('Exclui o último carro da lista e adiciona um novo carro com sucesso', () => {
  cy.request('GET', 'http://localhost:5000/cars')
    .then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array').that.is.not.empty;
      const lastCarId = response.body[response.body.length - 1].id;

      cy.request('DELETE', `http://localhost:5000/cars/${lastCarId}`)
        .then((deleteResponse) => {
          expect(deleteResponse.status).to.equal(200);

          const newCarData = {
            name: 'Fiorino',
            brand: 'Fiat',
            color: 'Azul',
            year: '1998',
          };

          cy.request('POST', 'http://localhost:5000/cars', newCarData)
            .then((addResponse) => {
              expect(addResponse.status).to.equal(200);
              expect(addResponse.body).to.have.property('id');
              expect(addResponse.body.name).to.equal(newCarData.name);
              expect(addResponse.body.brand).to.equal(newCarData.brand);
              expect(addResponse.body.color).to.equal(newCarData.color);
              expect(addResponse.body.year).to.equal(newCarData.year);
            });
        });
    });
});
