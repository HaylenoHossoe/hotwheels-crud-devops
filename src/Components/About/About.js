import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const About = () => {
  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 , textAlign: 'center' }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Sobre
          </Typography>
          <Typography variant="body1" component="div">
          Esta é uma aplicação para um CRUD de carros HotWheels, elaborada na disciplina Desenvolvimento de Sistemas Frontend do curso de Graduação Online da PUCRS.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;