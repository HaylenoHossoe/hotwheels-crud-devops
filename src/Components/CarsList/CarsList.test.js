import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CarsList from './CarsList';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockCars = [
  { id: 1, name: 'Fusca', brand: 'VW', color: 'Azul', year: 1970 },
  { id: 2, name: 'Maverick', brand: 'Ford', color: 'Vermelho', year: 1975 },
];

describe('CarsList', () => {
  const mockDeleteCar = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the list of cars', () => {
    render(
      <MemoryRouter>
        <CarsList cars={mockCars} deleteCar={mockDeleteCar} />
      </MemoryRouter>
    );

    expect(screen.getByText('Lista de Carros')).toBeInTheDocument();
    expect(screen.getByText('Fusca (VW)')).toBeInTheDocument();
    expect(screen.getByText('Maverick (Ford)')).toBeInTheDocument();
  });

  it('should filter cars based on search term', async () => {
    render(
      <MemoryRouter>
        <CarsList cars={mockCars} deleteCar={mockDeleteCar} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Pesquise pelo nome...'), { target: { value: 'fusca' } });
    fireEvent.click(screen.getByRole('button', { name: /buscar/i }));

    await waitFor(() => {
      expect(screen.getByText('Fusca (VW)')).toBeInTheDocument();
      expect(screen.queryByText('Maverick (Ford)')).not.toBeInTheDocument();
    });
  });

  it('should navigate to /not-found if no search results are found', async () => {
    render(
      <MemoryRouter>
        <CarsList cars={mockCars} deleteCar={mockDeleteCar} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Pesquise pelo nome...'), { target: { value: 'nonexistent' } });
    fireEvent.click(screen.getByRole('button', { name: /buscar/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/not-found');
    });
  });

  it('should call deleteCar when delete icon is clicked', async () => {
    render(
      <MemoryRouter>
        <CarsList cars={mockCars} deleteCar={mockDeleteCar} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getAllByLabelText('delete')[0]); // Clica no primeiro botão de delete

    await waitFor(() => {
      expect(mockDeleteCar).toHaveBeenCalledTimes(1);
      expect(mockDeleteCar).toHaveBeenCalledWith(1);
    });
  });

  it('should navigate to /add when "Adicionar Carro" button is clicked', async () => {
    render(
      <MemoryRouter>
        <CarsList cars={mockCars} deleteCar={mockDeleteCar} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('link', { name: /adicionar carro/i }));

    // Para testar a navegação, você precisaria de um Router configurado para renderizar o componente
    // de destino, ou verificar se o Link gerou a URL correta (o que já é implícito no componente Link).
    // O teste abaixo verifica a presença do link.
    expect(screen.getByRole('link', { name: /adicionar carro/i })).toHaveAttribute('href', '/add');
  });

  it('should navigate to car detail page when car name is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/cars']}>
        <Routes>
          <Route path="/cars" element={<CarsList cars={mockCars} deleteCar={mockDeleteCar} />} />
          <Route path="/car/:id" element={<div>Car Detail Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Fusca (VW)'));

    await waitFor(() => {
      expect(screen.getByText('Car Detail Page')).toBeInTheDocument();
    });
  });

  it('should navigate to edit page when edit icon is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/cars']}>
        <Routes>
          <Route path="/cars" element={<CarsList cars={mockCars} deleteCar={mockDeleteCar} />} />
          <Route path="/edit/:id" element={<div>Edit Car Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getAllByLabelText('edit')[0]); // Clica no primeiro botão de edição

    await waitFor(() => {
      expect(screen.getByText('Edit Car Page')).toBeInTheDocument();
    });
  });
});