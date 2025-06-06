import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

describe('NotFound', () => {
  test('renders NotFound component with correct text', () => {
    render(<NotFound />);
    expect(screen.getByText('Carro não encontrado')).toBeInTheDocument();
     expect(screen.getByText(/Carro inexistente ou excluído, procure outro carro/i)).toBeInTheDocument();
  });
});