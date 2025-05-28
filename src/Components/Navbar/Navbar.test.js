import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('should render the HotWheels logo', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const logo = screen.getByAltText('HotWheels Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'HotWheels-logo.jpg');
  });

  it('should render navigation links with correct paths', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /sobre/i })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: /carros/i })).toHaveAttribute('href', '/cars');
    expect(screen.getByRole('link', { name: /\+carro/i })).toHaveAttribute('href', '/add');
  });
});