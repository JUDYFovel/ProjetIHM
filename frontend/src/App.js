import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import TrainList from './TrainList';
import TrainDetails from './TrainDetails';
import Reservations from './Reservations';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trainlist" element={<TrainList />} />
        <Route path="/traindetails" element={<TrainDetails />} />
        <Route path="/reservations/:id" element={<Reservations />} />
      </Routes>
    </Router>
  );
}

export default App;
