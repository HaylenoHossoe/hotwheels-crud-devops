import { renderHook, waitFor, act } from '@testing-library/react';
import useCars from './useCars';
import axios from 'axios';

jest.mock('axios');

describe('useCars', () => {
  const mockCars = [
    { id: 1, name: 'Fusca', brand: 'VW', color: 'Azul', year: 1970 },
    { id: 2, name: 'Maverick', brand: 'Ford', color: 'Vermelho', year: 1975 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch cars on initial load', async () => {
    axios.get.mockResolvedValue({ data: mockCars });

    const { result } = renderHook(() => useCars());

    expect(result.current.loading).toBe(true);
    expect(result.current.cars).toEqual([]);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/cars');
    expect(result.current.cars).toEqual(mockCars);
    expect(result.current.error).toBeNull();
  });

  test('should handle error when fetching cars', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useCars());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/cars');
    expect(result.current.cars).toEqual([]);
    expect(result.current.error).toEqual(new Error('Network Error'));
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching cars:', expect.any(Error));
    consoleErrorSpy.mockRestore();
  });

  test('should add a car', async () => {
    const newCar = { name: 'Opala', brand: 'GM', color: 'Preto', year: 1978 };
    const addedCar = { id: 3, ...newCar };
    axios.post.mockResolvedValue({ data: addedCar });
    axios.get.mockResolvedValue({ data: mockCars }); // Mocka o get inicial

    const { result } = renderHook(() => useCars());

    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => { // Envolva a chamada da função com 'act'
      await result.current.addCar(newCar);
    });

    await waitFor(() => { // Use waitFor para aguardar a atualização do estado
      expect(result.current.cars).toEqual([...mockCars, addedCar]);
    });
    expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/cars', newCar);
  });

  test('should handle error when adding a car', async () => {
    const newCar = { name: 'Opala', brand: 'GM', color: 'Preto', year: 1978 };
    axios.post.mockRejectedValue(new Error('Add Error'));
    axios.get.mockResolvedValue({ data: mockCars });
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useCars());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => { // Envolva a chamada da função com 'act'
      await result.current.addCar(newCar);
    });

    await waitFor(() => {
      expect(result.current.cars).toEqual(mockCars); // Estado não deve mudar
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error adding car:', expect.any(Error));
    consoleErrorSpy.mockRestore();
  });

  test('should edit a car', async () => {
    const updatedCarData = { name: 'Fusca Novo', brand: 'VW', color: 'Amarelo', year: 1980 };
    const editedCar = { id: 1, ...updatedCarData };
    axios.put.mockResolvedValue({ data: editedCar });
    axios.get.mockResolvedValue({ data: mockCars }); // Mocka o get inicial

    const { result } = renderHook(() => useCars());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => { // Envolva a chamada da função com 'act'
      await result.current.editCar(1, updatedCarData);
    });

    await waitFor(() => { // Use waitFor para aguardar a atualização do estado
      expect(result.current.cars).toEqual([editedCar, mockCars[1]]);
    });
    expect(axios.put).toHaveBeenCalledWith('http://localhost:5000/cars/1', updatedCarData);
  });

  test('should handle error when editing a car', async () => {
    const updatedCarData = { name: 'Fusca Novo', brand: 'VW', color: 'Amarelo', year: 1980 };
    axios.put.mockRejectedValue(new Error('Edit Error'));
    axios.get.mockResolvedValue({ data: mockCars });
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useCars());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => { // Envolva a chamada da função com 'act'
      await result.current.editCar(1, updatedCarData);
    });

    await waitFor(() => {
      expect(result.current.cars).toEqual(mockCars); // Estado não deve mudar
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error editing car:', expect.any(Error));
    consoleErrorSpy.mockRestore();
  });

  test('should delete a car', async () => {
    axios.delete.mockResolvedValue({ data: { success: true } });
    axios.get.mockResolvedValue({ data: mockCars }); // Mocka o get inicial

    const { result } = renderHook(() => useCars());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => { // Envolva a chamada da função com 'act'
      await result.current.deleteCar(1);
    });

    await waitFor(() => { // Use waitFor para aguardar a atualização do estado
      expect(result.current.cars).toEqual([mockCars[1]]);
    });
    expect(axios.delete).toHaveBeenCalledWith('http://localhost:5000/cars/1');
  });

  test('should handle error when deleting a car', async () => {
    axios.delete.mockRejectedValue(new Error('Delete Error'));
    axios.get.mockResolvedValue({ data: mockCars });
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useCars());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => { // Envolva a chamada da função com 'act'
      await result.current.deleteCar(1);
    });

    await waitFor(() => {
      expect(result.current.cars).toEqual(mockCars); // Estado não deve mudar
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error deleting car:', expect.any(Error));
    consoleErrorSpy.mockRestore();
  });
});