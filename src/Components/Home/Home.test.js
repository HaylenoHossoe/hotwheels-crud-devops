import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home', () => {
  test('renders Home component with correct text', () => {
    render(<Home />);
    expect(screen.getByText('Bem-vindo à coleção de HotWheels!')).toBeInTheDocument();
  });
});