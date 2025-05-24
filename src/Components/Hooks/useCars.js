import { useState, useEffect } from 'react';
import axios from 'axios';

const useCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cars');
        setCars(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addCar = async (newCar) => {
    try {
      const response = await axios.post('http://localhost:5000/cars', newCar);
      setCars(prevCars => [...prevCars, response.data]);
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  const editCar = async (carId, updatedCarData) => {
    try {
      const response = await axios.put(`http://localhost:5000/cars/${carId}`, updatedCarData);
      setCars(prevCars => prevCars.map(car => (car.id === carId ? response.data : car)));
    } catch (error) {
      console.error('Error editing car:', error);
    }
  };

  const deleteCar = async (carId) => {
    try {
      await axios.delete(`http://localhost:5000/cars/${carId}`);
      setCars(prevCars => prevCars.filter(car => car.id !== carId));
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  return { cars, loading, addCar, editCar, deleteCar };
};

export default useCars;
