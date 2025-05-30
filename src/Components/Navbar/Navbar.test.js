import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
// Importe MemoryRouter diretamente, pois já foi mockado globalmente no jest.mock
import { MemoryRouter } from 'react-router-dom'; 

// Mock de react-router-dom para os componentes que Navbar utiliza
// Este mock será usado para qualquer importação de 'react-router-dom'
jest.mock('react-router-dom', () => ({
  // O componente Link é usado na Navbar, então o mockamos como um <a>
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  // MemoryRouter é usado para testar componentes que usam Link/Routes em um ambiente de teste.
  // Mocke-o aqui para que a importação acima (`import { MemoryRouter } from 'react-router-dom';`)
  // já use este mock.
  MemoryRouter: ({ children }) => <div>{children}</div>,
}));

describe('Navbar', () => {
  test('renders navigation links', () => {
    // Renderiza o Navbar dentro do MemoryRouter MOCKADO
    render(
      <MemoryRouter> {/* Use o MemoryRouter mockado aqui */}
        <Navbar />
      </MemoryRouter>
    );

    // Verifica se os links estão presentes
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Cars')).toBeInTheDocument();
    expect(screen.getByText('Add Car')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();

    // Verifica se os atributos href estão corretos
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Cars' })).toHaveAttribute('href', '/cars');
    expect(screen.getByRole('link', { name: 'Add Car' })).toHaveAttribute('href', '/add-car');
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
  });
});