import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HotWheelsLogo from './HotWheels-logo.jpg';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ flexGrow: 1 }}>
      <Toolbar>
        <img src={HotWheelsLogo} alt="HotWheels Logo" style={{ width: '40px', marginRight: '10px' }} />
        <Typography variant="h6" component={Link} to="/" sx={{ color: '#fff', textDecoration: 'none', marginRight: '10px' }}>
          Home
        </Typography>
        <Typography variant="h6" component={Link} to="/about" sx={{ color: '#fff', textDecoration: 'none', marginRight: '10px' }}>
          Sobre
        </Typography>
        <Typography variant="h6" component={Link} to="/cars" sx={{ color: '#fff', textDecoration: 'none', marginRight: '10px' }}>
          Carros
        </Typography>
        <Typography variant="h6" component={Link} to="/add" sx={{ color: '#fff', textDecoration: 'none' }}>
          +Carro
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;