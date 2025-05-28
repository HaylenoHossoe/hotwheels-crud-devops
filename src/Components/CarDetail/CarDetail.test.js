import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CarDetail from './CarDetail';

// Mock useParams e useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

const mockCars = [
  { id: 1, name: 'Fusca', brand: 'VW', color: 'Azul', year: 1970 },
  { id: 2, name: 'Maverick', brand: 'Ford', color: 'Vermelho', year: 1975 },
];

describe('CarDetail', () => {
  const mockDeleteCar = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display "Carro não encontrado" if car is not found', () => {
    require('react-router-dom').useParams.mockReturnValue({ id: '99' });

    render(
      <MemoryRouter>
        <CarDetail cars={mockCars} deleteCar={mockDeleteCar} />
      </MemoryRouter>
    );

    expect(screen.getByText('Carro não encontrado')).toBeInTheDocument();
  });

  it('should display car details when a car is found', () => {
    require('react-router-dom').useParams.mockReturnValue({ id: '1' });

    render(
      <MemoryRouter>
        <CarDetail cars={mockCars} deleteCar={mockDeleteCar} />
      </MemoryRouter>
    );

    expect(screen.getByText('Detalhes do Carro')).toBeInTheDocument();
    expect(screen.getByText('ID: 1')).toBeInTheDocument();
    expect(screen.getByText('Nome: Fusca')).toBeInTheDocument();
    expect(screen.getByText('Marca: VW')).toBeInTheDocument();
    expect(screen.getByText('Cor: Azul')).toBeInTheDocument();
    expect(screen.getByText('Ano: 1970')).toBeInTheDocument();
  });

  it('should call deleteCar and navigate to /not-found on delete button click', async () => {
    require('react-router-dom').useParams.mockReturnValue({ id: '1' });

    render(
      <MemoryRouter>
        <CarDetail cars={mockCars} deleteCar={mockDeleteCar} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /excluir/i }));

    await waitFor(() => {
      expect(mockDeleteCar).toHaveBeenCalledTimes(1);
      expect(mockDeleteCar).toHaveBeenCalledWith(1);
      expect(mockNavigate).toHaveBeenCalledWith('/not-found');
    });
  });

  it('should navigate to edit page on edit button click', async () => {
    require('react-router-dom').useParams.mockReturnValue({ id: '1' });

    render(
      <MemoryRouter>
        <CarDetail cars={mockCars} deleteCar={mockDeleteCar} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /editar/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith('/edit/1');
    });
  });
});