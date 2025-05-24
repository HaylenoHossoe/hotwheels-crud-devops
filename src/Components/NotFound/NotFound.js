import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const NotFound = () => {
  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20, textAlign: 'center' }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" align="center" gutterBottom>Carro não encontrado</Typography>
          <Typography variant="body1" component="div" align="center">Carro inexistente ou excluído, procure outro carro.</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;