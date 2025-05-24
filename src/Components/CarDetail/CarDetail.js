import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Button, Typography, Box } from '@mui/material';

const CarDetail = ({ cars, deleteCar }) => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const foundCar = cars.find((car) => car.id.toString() === id);
    setCar(foundCar);
  }, [cars, id]);

  const handleDelete = () => {
    deleteCar(car.id);
    navigate('/not-found');
  };

  const handleEditClick = () => {
    navigate(`/edit/${car.id}`);
  };

  if (!car) {
    return (
      <div style={{ maxWidth: 800, margin: 'auto', marginTop: 16, textAlign: 'center' }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="body1" component="div">Carro não encontrado</Typography>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20, textAlign: 'center' }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>Detalhes do Carro</Typography>
          <Typography variant="body1" component="div">ID: {car.id}</Typography>
          <Typography variant="body1" component="div">Nome: {car.name}</Typography>
          <Typography variant="body1" component="div">Marca: {car.brand}</Typography>
          <Typography variant="body1" component="div">Cor: {car.color}</Typography>
          <Typography variant="body1" component="div">Ano: {car.year}</Typography>
          <Box marginTop={2}>
            <Button variant="contained" onClick={handleEditClick} style={{ marginRight: 8 }}>Editar</Button>
            <Button variant="contained" onClick={handleDelete}>Excluir</Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarDetail;
