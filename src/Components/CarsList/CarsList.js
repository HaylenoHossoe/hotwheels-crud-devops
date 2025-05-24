import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Grid,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const CarsList = ({ cars, deleteCar }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setSearchResults(cars);
  }, [cars]);

  const handleSearch = () => {
    const results = cars.filter((car) =>
      car && car.name && car.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    if (results.length === 0) {
      navigate('/not-found');
    }
  };

  const handleDelete = (carId) => {
    deleteCar(carId);
    setSearchResults(searchResults.filter((car) => car.id !== carId));
  };

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <Typography variant="h5" gutterBottom>
        Lista de Carros
      </Typography>
      <div style={{ marginBottom: 20 }}>
        <TextField
          label="Pesquise pelo nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch} style={{ marginLeft: 10 }}>
          Buscar
        </Button>
      </div>
      <List>
        {searchResults.map((car) => (
          <ListItem key={car.id}>
            <ListItemText>
              <Link to={`/car/${car.id}`}>
                {car.name} ({car.brand})
              </Link>
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton component={Link} to={`/edit/${car.id}`} color="primary" aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(car.id)} color="secondary" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Grid container justifyContent="center" style={{ marginTop: 20 }}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/add"
          >
            Adicionar Carro
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CarsList;
