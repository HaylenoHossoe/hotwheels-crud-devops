import React from 'react';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import HotWheelsHomeImage from './HotWheels-home.jpg';

const Home = () => {
  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <Card>
        <CardMedia
          component="img"
          height="300"
          src={HotWheelsHomeImage}
          alt="HotWheels Home"
          style={{ objectFit: 'contain' }}
        />
        <CardContent style={{ textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            HotWheels
          </Typography>
          <Typography>
            Bem-vindo à coleção de HotWheels!
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;