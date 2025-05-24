import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import CarsList from './Components/CarsList/CarsList';
import CarForm from './Components/CarForm/CarForm';
import CarDetail from './Components/CarDetail/CarDetail';
import NotFound from './Components/NotFound/NotFound';
import useCars from './Components/Hooks/useCars'; 

const App = () => {
  const { cars, loading, addCar, editCar, deleteCar } = useCars();

  return (
    <Router>
      <div>
        <Navbar />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Routes>
            <Route path="/about" element={<About />} />
            <Route
              path="/cars"
              element={<CarsList cars={cars} deleteCar={deleteCar} />}
            />
            <Route
              path="/add"
              element={<CarForm addCar={addCar} />}
            />
            <Route
              path="/edit/:id"
              element={<CarForm editCar={editCar} cars={cars} />}
            />
            <Route
              path="/car/:id"
              element={<CarDetail cars={cars} deleteCar={deleteCar} />}
            />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
