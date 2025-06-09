import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage.jsx';
import HomePage from './pages/HomePage.jsx';
import './App.css';

function App() {
  return (

    /* Rutas */

    <Router>
      <div className="App">
        <Routes>
          {/* Ruta de bienvenida */}
          <Route path="/" element={<WelcomePage />} />

          {/* Ruta de la pantalla principal */}
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;