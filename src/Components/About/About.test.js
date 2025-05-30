import React from 'react';
import { render, screen } from '@testing-library/react';
import About from './About';

describe('About', () => {
  test('renders About component with correct text', () => {
    render(<About />);
    expect(screen.getByText('Sobre')).toBeInTheDocument();
    expect(screen.getByText(/Esta é uma aplicação para um CRUD de carros HotWheels/i)).toBeInTheDocument();
  });
});