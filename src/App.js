import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Navbar } from './components/navbar/navbar.js';
import Home from './Home';
import Customers from './customers.js';
import Films from './films.js';
import "./App.css"; // Keep the global styles

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/films" element={<Films />} />
        <Route path="/customers" element={<Customers />} />
        {/* Redirect unknown paths to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
