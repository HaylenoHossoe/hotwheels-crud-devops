import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CarForm from './CarForm';
import { MemoryRouter, Route, Routes } from 'react-router-dom'; // Importe para uso no render
import axios from 'axios';
import useCars from '../Hooks/useCars'; // Importe o hook

// Mock useParams e useNavigate
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

// Mock do axios
jest.mock('axios');

// Mock do hook useCars
jest.mock('../Hooks/useCars', () => ({
  __esModule: true, // Necessário para mocks de módulos ES6
  default: jest.fn(), // Mocka o hook inteiro
}));

describe('CarForm', () => {
  const mockNavigate = jest.fn();
  const mockAddCar = jest.fn();
  const mockEditCar = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Define os valores padrão para os mocks
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    require('react-router-dom').useParams.mockReturnValue({}); // Para o modo 'add'
    useCars.mockReturnValue({
      cars: [],
      addCar: mockAddCar,
      editCar: mockEditCar,
    });
  });

  // Testes para o modo de adição (add car)
  test('renders form for adding a new car', () => {
    render(
      <MemoryRouter>
        <CarForm />
      </MemoryRouter>
    );

    expect(screen.getByText('Add New Car')).toBeInTheDocument();
    expect(screen.getByLabelText('Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Brand:')).toBeInTheDocument();
    expect(screen.getByLabelText('Color:')).toBeInTheDocument();
    expect(screen.getByLabelText('Year:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Car' })).toBeInTheDocument();
  });

  test('submits form to add a new car', async () => {
    render(
      <MemoryRouter>
        <CarForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'Test Car' } });
    fireEvent.change(screen.getByLabelText('Brand:'), { target: { value: 'Test Brand' } });
    fireEvent.change(screen.getByLabelText('Color:'), { target: { value: 'Test Color' } });
    fireEvent.change(screen.getByLabelText('Year:'), { target: { value: '2023' } });

    fireEvent.click(screen.getByRole('button', { name: 'Add Car' }));

    await waitFor(() => {
      expect(mockAddCar).toHaveBeenCalledWith({
        name: 'Test Car',
        brand: 'Test Brand',
        color: 'Test Color',
        year: 2023, // Ano é convertido para número
      });
    });
    expect(mockNavigate).toHaveBeenCalledWith('/cars');
  });

  // Testes para o modo de edição (edit car)
  test('renders form for editing an existing car', async () => {
    // Mock useParams para retornar um id
    require('react-router-dom').useParams.mockReturnValue({ id: '1' });
    // Mock useCars para retornar carros e simular que o carro 1 existe
    useCars.mockReturnValue({
      cars: [{ id: 1, name: 'Old Car', brand: 'Old Brand', color: 'Old Color', year: 2000 }],
      addCar: mockAddCar,
      editCar: mockEditCar,
    });

    render(
      <MemoryRouter initialEntries={['/cars/1/edit']}>
        <Routes>
          <Route path="/cars/:id/edit" element={<CarForm />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Edit Car')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Old Car')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Old Brand')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Old Color')).toBeInTheDocument();
      expect(screen.getByDisplayValue('2000')).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: 'Update Car' })).toBeInTheDocument();
  });

  test('submits form to edit an existing car', async () => {
    require('react-router-dom').useParams.mockReturnValue({ id: '1' });
    useCars.mockReturnValue({
      cars: [{ id: 1, name: 'Old Car', brand: 'Old Brand', color: 'Old Color', year: 2000 }],
      addCar: mockAddCar,
      editCar: mockEditCar,
    });

    render(
      <MemoryRouter initialEntries={['/cars/1/edit']}>
        <Routes>
          <Route path="/cars/:id/edit" element={<CarForm />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('Old Car')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'Updated Car' } });
    fireEvent.change(screen.getByLabelText('Year:'), { target: { value: '2022' } });

    fireEvent.click(screen.getByRole('button', { name: 'Update Car' }));

    await waitFor(() => {
      expect(mockEditCar).toHaveBeenCalledWith('1', {
        name: 'Updated Car',
        brand: 'Old Brand',
        color: 'Old Color',
        year: 2022,
      });
    });
    expect(mockNavigate).toHaveBeenCalledWith('/cars');
  });

  test('shows error when car not found in edit mode', async () => {
    require('react-router-dom').useParams.mockReturnValue({ id: '99' }); // ID que não existe
    useCars.mockReturnValue({
      cars: [{ id: 1, name: 'Old Car', brand: 'Old Brand', color: 'Old Color', year: 2000 }],
      addCar: mockAddCar,
      editCar: mockEditCar,
    });

    render(
      <MemoryRouter initialEntries={['/cars/99/edit']}>
        <Routes>
          <Route path="/cars/:id/edit" element={<CarForm />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Car not found.')).toBeInTheDocument();
    });
  });
});