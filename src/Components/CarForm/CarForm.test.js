import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CarForm from './CarForm';

// Mock useParams e useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

const mockCars = [
  { id: 1, name: 'Fusca', brand: 'VW', color: 'Azul', year: 1970 },
];

describe('CarForm', () => {
  const mockAddCar = jest.fn();
  const mockEditCar = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Testes para o modo de adição (addCar)
  it('should render "Adicionar Novo Carro" in add mode', () => {
    require('react-router-dom').useParams.mockReturnValue({}); // Sem ID na URL

    render(
      <MemoryRouter>
        <CarForm addCar={mockAddCar} />
      </MemoryRouter>
    );

    expect(screen.getByText('Adicionar Novo Carro')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /adicionar carro/i })).toBeInTheDocument();
  });

  it('should call addCar and navigate to /cars on form submission in add mode', async () => {
    require('react-router-dom').useParams.mockReturnValue({});

    render(
      <MemoryRouter>
        <CarForm addCar={mockAddCar} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Novo Carro' } });
    fireEvent.change(screen.getByLabelText(/marca/i), { target: { value: 'Marca X' } });
    fireEvent.change(screen.getByLabelText(/cor/i), { target: { value: 'Verde' } });
    fireEvent.change(screen.getByLabelText(/ano/i), { target: { value: '2020' } });

    fireEvent.click(screen.getByRole('button', { name: /adicionar carro/i }));

    await waitFor(() => {
      expect(mockAddCar).toHaveBeenCalledTimes(1);
      expect(mockAddCar).toHaveBeenCalledWith({
        name: 'Novo Carro',
        brand: 'Marca X',
        color: 'Verde',
        year: '2020',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/cars');
    });
  });

  // Testes para o modo de edição (editCar)
  it('should render "Editar Carro" and pre-fill form in edit mode', async () => {
    require('react-router-dom').useParams.mockReturnValue({ id: '1' });

    render(
      <MemoryRouter initialEntries={['/edit/1']}>
        <Routes>
          <Route path="/edit/:id" element={<CarForm editCar={mockEditCar} cars={mockCars} />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Editar Carro')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Fusca')).toBeInTheDocument();
      expect(screen.getByDisplayValue('VW')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Azul')).toBeInTheDocument();
      expect(screen.getByDisplayValue('1970')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /salvar alterações/i })).toBeInTheDocument();
    });
  });

  it('should call editCar and navigate to /cars on form submission in edit mode', async () => {
    require('react-router-dom').useParams.mockReturnValue({ id: '1' });

    render(
      <MemoryRouter initialEntries={['/edit/1']}>
        <Routes>
          <Route path="/edit/:id" element={<CarForm editCar={mockEditCar} cars={mockCars} />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Fusca Editado' } });
    });

    fireEvent.click(screen.getByRole('button', { name: /salvar alterações/i }));

    await waitFor(() => {
      expect(mockEditCar).toHaveBeenCalledTimes(1);
      expect(mockEditCar).toHaveBeenCalledWith(1, {
        name: 'Fusca Editado',
        brand: 'VW',
        color: 'Azul',
        year: '1970',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/cars');
    });
  });

  it('should display "Carro não encontrado" if car to edit is not found', () => {
    require('react-router-dom').useParams.mockReturnValue({ id: '99' });

    render(
      <MemoryRouter initialEntries={['/edit/99']}>
        <Routes>
          <Route path="/edit/:id" element={<CarForm editCar={mockEditCar} cars={mockCars} />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Carro não encontrado')).toBeInTheDocument();
  });
});