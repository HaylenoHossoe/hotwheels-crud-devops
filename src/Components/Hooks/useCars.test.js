import { renderHook, waitFor, act } from '@testing-library/react'; // Adicione 'act'
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

  // ... (seus testes de fetch e handle error) ...

  it('should add a car', async () => {
    const newCar = { name: 'Opala', brand: 'GM', color: 'Preto', year: 1978 };
    const addedCar = { id: 3, ...newCar };
    axios.post.mockResolvedValue({ data: addedCar });
    axios.get.mockResolvedValue({ data: mockCars });

    const { result } = renderHook(() => useCars());

    await waitFor(() => expect(result.current.loading).toBe(false));

    // ENVOLVA A CHAMADA DA FUNÇÃO COM 'act'
    await act(async () => {
      await result.current.addCar(newCar);
    });

    await waitFor(() => {
      expect(result.current.cars).toEqual([...mockCars, addedCar]);
    });
    expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/cars', newCar);
  });

  it('should handle error when adding a car', async () => {
    const newCar = { name: 'Opala', brand: 'GM', color: 'Preto', year: 1978 };
    axios.post.mockRejectedValue(new Error('Add Error'));
    axios.get.mockResolvedValue({ data: mockCars });
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useCars());
    await waitFor(() => expect(result.current.loading).toBe(false));

    // ENVOLVA A CHAMADA DA FUNÇÃO COM 'act'
    await act(async () => {
      await result.current.addCar(newCar);
    });

    await waitFor(() => {
      expect(result.current.cars).toEqual(mockCars);
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error adding car:', expect.any(Error));
    consoleErrorSpy.mockRestore();
  });

  it('should edit a car', async () => {
    const updatedCarData = { name: 'Fusca Novo', brand: 'VW', color: 'Amarelo', year: 1980 };
    const editedCar = { id: 1, ...updatedCarData };
    axios.put.mockResolvedValue({ data: editedCar });
    axios.get.mockResolvedValue({ data: mockCars });

    const { result } = renderHook(() => useCars());
    await waitFor(() => expect(result.current.loading).toBe(false));

    // ENVOLVA A CHAMADA DA FUNÇÃO COM 'act'
    await act(async () => {
      await result.current.editCar(1, updatedCarData);
    });

    await waitFor(() => {
      expect(result.current.cars).toEqual([editedCar, mockCars[1]]);
    });
    expect(axios.put).toHaveBeenCalledWith('http://localhost:5000/cars/1', updatedCarData);
  });

  it('should handle error when editing a car', async () => {
    const updatedCarData = { name: 'Fusca Novo', brand: 'VW', color: 'Amarelo', year: 1980 };
    axios.put.mockRejectedValue(new Error('Edit Error'));
    axios.get.mockResolvedValue({ data: mockCars });
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useCars());
    await waitFor(() => expect(result.current.loading).toBe(false));

    // ENVOLVA A CHAMADA DA FUNÇÃO COM 'act'
    await act(async () => {
      await result.current.editCar(1, updatedCarData);
    });

    await waitFor(() => {
      expect(result.current.cars).toEqual(mockCars);
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error editing car:', expect.any(Error));
    consoleErrorSpy.mockRestore();
  });

  it('should delete a car', async () => {
    axios.delete.mockResolvedValue({ data: { success: true } });
    axios.get.mockResolvedValue({ data: mockCars });

    const { result } = renderHook(() => useCars());
    await waitFor(() => expect(result.current.loading).toBe(false));

    // ENVOLVA A CHAMADA DA FUNÇÃO COM 'act'
    await act(async () => {
      await result.current.deleteCar(1);
    });

    await waitFor(() => {
      expect(result.current.cars).toEqual([mockCars[1]]);
    });
    expect(axios.delete).toHaveBeenCalledWith('http://localhost:5000/cars/1');
  });

  it('should handle error when deleting a car', async () => {
    axios.delete.mockRejectedValue(new Error('Delete Error'));
    axios.get.mockResolvedValue({ data: mockCars });
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useCars());
    await waitFor(() => expect(result.current.loading).toBe(false));

    // ENVOLVA A CHAMADA DA FUNÇÃO COM 'act'
    await act(async () => {
      await result.current.deleteCar(1);
    });

    await waitFor(() => {
      expect(result.current.cars).toEqual(mockCars);
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error deleting car:', expect.any(Error));
    consoleErrorSpy.mockRestore();
  });
});