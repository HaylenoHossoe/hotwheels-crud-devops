import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  Grid,
} from '@mui/material';

const CarForm = ({ addCar, editCar, deleteCar, editingCar, cars }) => {
  const [newCar, setNewCar] = useState({ name: '', brand: '', color: '', year: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (editingCar !== null && cars && cars.length > 0) {
      const carToEdit = cars.find(car => car.id === parseInt(id, 10));
      if (carToEdit) {
        setNewCar(carToEdit);
        setIsEditing(true);
      }
    } else {
      setIsEditing(false);
      setNewCar({ name: '', brand: '', color: '', year: '' });
    }
  }, [editingCar, cars, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar({ ...newCar, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedCar = {
      name: newCar.name.trim(),
      brand: newCar.brand.trim(),
      color: newCar.color.trim(),
      year: newCar.year.trim(),
    };
    if (trimmedCar.name && trimmedCar.brand && trimmedCar.color && trimmedCar.year) {
      if (isEditing) {
        await editCar(newCar.id, trimmedCar);
        setSuccessMessage('Carro editado com sucesso!');
        navigate(`/car/${newCar.id}`);
      } else {
        await addCar(trimmedCar);
        setSuccessMessage('Carro adicionado com sucesso!');
      }
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/cars');
      }, 1000);

    } else {
      alert('Os campos não podem estar vazios ou preenchidos com espaços. Por favor, preencha todos os campos');
    } 
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza de que deseja excluir este carro?')) {
      await deleteCar(newCar.id);
      navigate('*');
    }
  };

  const handleCancel = () => {
    navigate('/cars');
  };

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <Typography variant="h5" gutterBottom>
        {isEditing ? 'Editar Carro' : 'Adicionar Carro'}
      </Typography>
      {successMessage && <Typography style={{ color: 'green' }}>{successMessage}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          name="name"
          label="Nome"
          value={newCar.name}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          type="text"
          name="brand"
          label="Marca"
          value={newCar.brand}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          type="text"
          name="color"
          label="Cor"
          value={newCar.color}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          type="text"
          name="year"
          label="Ano"
          value={newCar.year}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />
        <Grid container justifyContent="space-between" style={{ marginTop: 20 }}>
          <Button type="submit" variant="contained" color="primary">
            {isEditing ? 'Salvar Edições' : 'Incluir Carro'}
          </Button>
          <Button type="button" onClick={handleCancel} variant="contained">
            Cancelar
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default CarForm;