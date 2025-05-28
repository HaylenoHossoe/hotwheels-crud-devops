import React from 'react';
import { render, screen } from '@testing-library/react';
import About from './About';

describe('About', () => {
  it('should render the About Us section with correct title and text', () => {
    render(<About />);

    expect(screen.getByText('Sobre')).toBeInTheDocument();
    expect(screen.getByText(/Esta é uma aplicação para um CRUD de carros HotWheels/i)).toBeInTheDocument();
  });
});