import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CarsList from './CarsList';
import { MemoryRouter } from 'react-router-dom'; // Importe MemoryRouter
import useCars from '../Hooks/useCars';

// Mock useNavigate e Link
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

// Mock do hook useCars
jest.mock('../Hooks/useCars', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('CarsList', () => {
  const mockNavigate = jest.fn();
  const mockDeleteCar = jest.fn();
  const mockCars = [
    { id: 1, name: 'Fusca', brand: 'VW', color: 'Azul', year: 1970 },
    { id: 2, name: 'Maverick', brand: 'Ford', color: 'Vermelho', year: 1975 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    useCars.mockReturnValue({
      cars: mockCars,
      loading: false,
      error: null,
      deleteCar: mockDeleteCar,
    });
  });

  test('renders a list of cars', async () => {
    render(
      <MemoryRouter>
        <CarsList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Fusca (VW - Azul - 1970)')).toBeInTheDocument();
      expect(screen.getByText('Maverick (Ford - Vermelho - 1975)')).toBeInTheDocument();
    });
  });

  test('navigates to car detail page on "Details" button click', async () => {
    render(
      <MemoryRouter>
        <CarsList />
      </MemoryRouter>
    );

    const detailsButton = screen.getAllByRole('button', { name: 'Details' })[0];
    fireEvent.click(detailsButton);

    expect(mockNavigate).toHaveBeenCalledWith('/cars/1');
  });

  test('navigates to car edit page on "Edit" button click', async () => {
    render(
      <MemoryRouter>
        <CarsList />
      </MemoryRouter>
    );

    const editButton = screen.getAllByRole('button', { name: 'Edit' })[0];
    fireEvent.click(editButton);

    expect(mockNavigate).toHaveBeenCalledWith('/cars/1/edit');
  });

  test('calls deleteCar on "Delete" button click', async () => {
    render(
      <MemoryRouter>
        <CarsList />
      </MemoryRouter>
    );

    const deleteButton = screen.getAllByRole('button', { name: 'Delete' })[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockDeleteCar).toHaveBeenCalledWith(1);
    });
  });

  test('renders "No cars available." when the list is empty', async () => {
    useCars.mockReturnValue({
      cars: [], // Retorna uma lista vazia
      loading: false,
      error: null,
      deleteCar: mockDeleteCar,
    });

    render(
      <MemoryRouter>
        <CarsList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No cars available.')).toBeInTheDocument();
    });
  });

  test('renders "Loading..." when cars are loading', () => {
    useCars.mockReturnValue({
      cars: [],
      loading: true, // Simula o estado de carregamento
      error: null,
      deleteCar: mockDeleteCar,
    });

    render(
      <MemoryRouter>
        <CarsList />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error message when there is an error fetching cars', () => {
    useCars.mockReturnValue({
      cars: [],
      loading: false,
      error: new Error('Failed to fetch cars'), // Simula um erro
      deleteCar: mockDeleteCar,
    });

    render(
      <MemoryRouter>
        <CarsList />
      </MemoryRouter>
    );

    expect(screen.getByText('Error: Failed to fetch cars')).toBeInTheDocument();
  });
});