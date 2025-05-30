import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // <--- GARANTA QUE ESTÁ INICIALIZADO COMO null

  const fetchCars = useCallback(async () => {
    setLoading(true);
    setError(null); // Limpa erros anteriores antes de tentar buscar
    try {
      const response = await axios.get('http://localhost:5000/cars');
      setCars(response.data);
    } catch (err) {
      console.error('Error fetching cars:', err);
      setError(err); // <--- GARANTA QUE VOCÊ ESTÁ DEFININDO O OBJETO DE ERRO AQUI
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const addCar = useCallback(async (newCar) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/cars', newCar);
      setCars((prevCars) => [...prevCars, response.data]);
    } catch (err) {
      console.error('Error adding car:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const editCar = useCallback(async (id, updatedCarData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`http://localhost:5000/cars/${id}`, updatedCarData);
      setCars((prevCars) =>
        prevCars.map((car) => (car.id === parseInt(id) ? response.data : car))
      );
    } catch (err) {
      console.error('Error editing car:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteCar = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`http://localhost:5000/cars/${id}`);
      setCars((prevCars) => prevCars.filter((car) => car.id !== parseInt(id)));
    } catch (err) {
      console.error('Error deleting car:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { cars, loading, error, addCar, editCar, deleteCar };
};

export default useCars;