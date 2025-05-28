const request = require('supertest');
const express = require('express');
const fs = require('fs');
const mockFs = require('jest-mock-fs');

// Crie uma instância do seu aplicativo Express para testes
// Precisamos importar o arquivo 'server.js' após o mock do fs
let app; // Declare a variável app fora do describe para poder reatribuir

describe('API Server', () => {
  const initialCarsData = [
    { id: 1, name: 'Fusca', brand: 'VW', color: 'Azul', year: 1970 },
    { id: 2, name: 'Maverick', brand: 'Ford', color: 'Vermelho', year: 1975 },
  ];

  beforeEach(() => {
    // Configura o mock do sistema de arquivos antes de cada teste
    mockFs({
      './carsData.json': JSON.stringify(initialCarsData, null, 2),
    });

    // Importa o server.js *depois* que o mock do fs é configurado
    // Isso garante que o server.js leia o carsData.json mockado
    // Se o server.js estivesse fora, ele leria o arquivo real antes do mock
    jest.resetModules(); // Reseta os módulos para importar server.js novamente
    app = require('../server'); // Caminho relativo ao seu arquivo server.js
  });

  afterEach(() => {
    mockFs.restore(); // Restaura o sistema de arquivos após cada teste
  });

  describe('GET /cars', () => {
    it('should return all cars', async () => {
      const res = await request(app).get('/cars');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(initialCarsData);
    });
  });

  describe('POST /cars', () => {
    it('should add a new car', async () => {
      const newCar = { name: 'Opala', brand: 'GM', color: 'Preto', year: 1978 };
      const res = await request(app).post('/cars').send(newCar);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({ id: 3, ...newCar }); // ID esperado é 3

      // Verifica se o arquivo JSON foi atualizado
      const updatedCarsData = JSON.parse(fs.readFileSync('./carsData.json'));
      expect(updatedCarsData).toEqual([...initialCarsData, { id: 3, ...newCar }]);
    });

    it('should assign id 1 if carsData is empty', async () => {
      mockFs({ './carsData.json': '[]' }); // Mock com dados vazios
      jest.resetModules();
      app = require('../server');

      const newCar = { name: 'Celta', brand: 'Chevrolet', color: 'Prata', year: 2008 };
      const res = await request(app).post('/cars').send(newCar);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({ id: 1, ...newCar });

      const updatedCarsData = JSON.parse(fs.readFileSync('./carsData.json'));
      expect(updatedCarsData).toEqual([{ id: 1, ...newCar }]);
    });
  });

  describe('PUT /cars/:id', () => {
    it('should update an existing car', async () => {
      const updatedCarData = { name: 'Fusca Reformado', color: 'Verde' };
      const res = await request(app).put('/cars/1').send(updatedCarData);
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toEqual('Fusca Reformado');
      expect(res.body.color).toEqual('Verde');
      expect(res.body.brand).toEqual('VW'); // Brand should remain the same

      // Verifica se o arquivo JSON foi atualizado
      const updatedCarsDataFile = JSON.parse(fs.readFileSync('./carsData.json'));
      const expectedCarsData = [
        { id: 1, name: 'Fusca Reformado', brand: 'VW', color: 'Verde', year: 1970 },
        initialCarsData[1],
      ];
      expect(updatedCarsDataFile).toEqual(expectedCarsData);
    });

    it('should return 404 if car to update is not found', async () => {
      const updatedCarData = { name: 'Carro Inexistente' };
      const res = await request(app).put('/cars/99').send(updatedCarData);
      expect(res.statusCode).toEqual(404);
      expect(res.text).toEqual('Carro não encontrado');
    });
  });

  describe('DELETE /cars/:id', () => {
    it('should delete an existing car', async () => {
      const res = await request(app).delete('/cars/1');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({ success: true });

      // Verifica se o arquivo JSON foi atualizado
      const updatedCarsData = JSON.parse(fs.readFileSync('./carsData.json'));
      expect(updatedCarsData).toEqual([initialCarsData[1]]);
    });

    it('should return 404 if car to delete is not found', async () => {
      const res = await request(app).delete('/cars/99');
      expect(res.statusCode).toEqual(404);
      expect(res.text).toEqual('Carro não encontrado');
    });
  });
});