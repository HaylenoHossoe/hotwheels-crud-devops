import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import CarDetail from './CarDetail';
import { MemoryRouter, Route, Routes } from 'react-router-dom'; // Importe para uso no render
import useCars from '../Hooks/useCars'; // Importe o hook

// Mock useParams e useNavigate
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

// Mock do hook useCars
jest.mock('../Hooks/useCars', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('CarDetail', () => {
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
      cars: mockCars, // Retorna os carros mockados
      loading: false,
      error: null,
      deleteCar: mockDeleteCar,
    });
  });

  test('renders car details when car is found', async () => {
    require('react-router-dom').useParams.mockReturnValue({ id: '1' });

    render(
      <MemoryRouter initialEntries={['/cars/1']}>
        <Routes>
          <Route path="/cars/:id" element={<CarDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Car Details')).toBeInTheDocument();
      expect(screen.getByText('Name: Fusca')).toBeInTheDocument();
      expect(screen.getByText('Brand: VW')).toBeInTheDocument();
      expect(screen.getByText('Color: Azul')).toBeInTheDocument();
      expect(screen.getByText('Year: 1970')).toBeInTheDocument();
    });
  });

  test('navigates back to /cars on "Back to List" click', async () => {
    require('react-router-dom').useParams.mockReturnValue({ id: '1' });

    render(
      <MemoryRouter initialEntries={['/cars/1']}>
        <Routes>
          <Route path="/cars/:id" element={<CarDetail />} />
        </Routes>
      </MemoryRouter>
    );

    const backButton = screen.getByRole('button', { name: 'Back to List' });
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith('/cars');
  });

  test('calls deleteCar and navigates to /cars on "Delete Car" click', async () => {
    require('react-router-dom').useParams.mockReturnValue({ id: '1' });

    render(
      <MemoryRouter initialEntries={['/cars/1']}>
        <Routes>
          <Route path="/cars/:id" element={<CarDetail />} />
        </Routes>
      </MemoryRouter>
    );

    const deleteButton = screen.getByRole('button', { name: 'Delete Car' });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockDeleteCar).toHaveBeenCalledWith(1); // O ID deve ser numérico
    });
    expect(mockNavigate).toHaveBeenCalledWith('/cars');
  });

  test('renders "Car not found" if car does not exist', async () => {
    require('react-router-dom').useParams.mockReturnValue({ id: '99' }); // ID que não existe

    render(
      <MemoryRouter initialEntries={['/cars/99']}>
        <Routes>
          <Route path="/cars/:id" element={<CarDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Car not found.')).toBeInTheDocument();
    });
  });

  test('renders "Loading..." when cars are loading', () => {
    require('react-router-dom').useParams.mockReturnValue({ id: '1' });
    useCars.mockReturnValue({
      cars: [],
      loading: true, // Simula o estado de carregamento
      error: null,
      deleteCar: mockDeleteCar,
    });

    render(
      <MemoryRouter initialEntries={['/cars/1']}>
        <Routes>
          <Route path="/cars/:id" element={<CarDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error message when there is an error fetching cars', () => {
    require('react-router-dom').useParams.mockReturnValue({ id: '1' });
    useCars.mockReturnValue({
      cars: [],
      loading: false,
      error: new Error('Failed to fetch cars'), // Simula um erro
      deleteCar: mockDeleteCar,
    });

    render(
      <MemoryRouter initialEntries={['/cars/1']}>
        <Routes>
          <Route path="/cars/:id" element={<CarDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Error: Failed to fetch cars')).toBeInTheDocument();
  });
});