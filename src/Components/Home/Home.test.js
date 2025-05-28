import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home', () => {
  it('should render the main title and welcome message', () => {
    render(<Home />);

    expect(screen.getByText('HotWheels')).toBeInTheDocument();
    expect(screen.getByText('Bem-vindo à coleção de HotWheels!')).toBeInTheDocument();
  });

  it('should render the HotWheels home image', () => {
    render(<Home />);

    const image = screen.getByAltText('HotWheels Home');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'HotWheels-home.jpg');
  });
});