const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Carrega dados dos carros do arquivo JSON
let carsData = JSON.parse(fs.readFileSync('./carsData.json'));

// Rota para obter a lista de carros
app.get('/cars', (req, res) => {
  res.json(carsData);
});

// Rota para adicionar um novo carro
app.post('/cars', (req, res) => {
  const newCar = req.body;
  newCar.id = carsData.length > 0 ? carsData[carsData.length - 1].id + 1 : 1;
  carsData.push(newCar);
  fs.writeFileSync('./carsData.json', JSON.stringify(carsData, null, 2));
  res.json(newCar);
});

// Rota para editar um carro
app.put('/cars/:id', (req, res) => {
  const { id } = req.params;
  const updatedCarData = req.body;
  const index = carsData.findIndex(car => car.id === parseInt(id));

  if (index !== -1) {
    carsData[index] = { ...carsData[index], ...updatedCarData };
    fs.writeFileSync('./carsData.json', JSON.stringify(carsData, null, 2));
    res.json(carsData[index]);
  } else {
    res.status(404).send('Carro não encontrado');
  }
});

// Rota para excluir um carro
app.delete('/cars/:id', (req, res) => {
  const { id } = req.params;
  const index = carsData.findIndex(car => car.id === parseInt(id));

  if (index !== -1) {
    carsData.splice(index, 1);
    fs.writeFileSync('./carsData.json', JSON.stringify(carsData, null, 2));
    res.json({ success: true });
  } else {
    res.status(404).send('Carro não encontrado');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
