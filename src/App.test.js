import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import useCars from './Components/Hooks/useCars';

// Mock do hook useCars
jest.mock('./Components/Hooks/useCars', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('App', () => {
  it('should display loading message initially', () => {
    useCars.mockReturnValue({
      cars: [],
      loading: true,
      addCar: jest.fn(),
      editCar: jest.fn(),
      deleteCar: jest.fn(),
    });

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render Navbar and Home component when not loading', async () => {
    useCars.mockReturnValue({
      cars: [],
      loading: false,
      addCar: jest.fn(),
      editCar: jest.fn(),
      deleteCar: jest.fn(),
    });

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('HotWheels')).toBeInTheDocument();
    });
  });

  it('should render About page when navigating to /about', async () => {
    useCars.mockReturnValue({
      cars: [],
      loading: false,
      addCar: jest.fn(),
      editCar: jest.fn(),
      deleteCar: jest.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Sobre')).toBeInTheDocument();
      expect(screen.getByText(/Esta é uma aplicação para um CRUD de carros HotWheels/i)).toBeInTheDocument();
    });
  });

  it('should render CarsList page when navigating to /cars', async () => {
    useCars.mockReturnValue({
      cars: [{ id: 1, name: 'Fusca', brand: 'VW', color: 'Azul', year: 1970 }],
      loading: false,
      addCar: jest.fn(),
      editCar: jest.fn(),
      deleteCar: jest.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/cars']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Lista de Carros')).toBeInTheDocument();
      expect(screen.getByText('Fusca (VW)')).toBeInTheDocument();
    });
  });

  it('should render NotFound page for an invalid route', async () => {
    useCars.mockReturnValue({
      cars: [],
      loading: false,
      addCar: jest.fn(),
      editCar: jest.fn(),
      deleteCar: jest.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/invalid-route']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Carro não encontrado')).toBeInTheDocument();
    });
  });
});