import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage.jsx';
import HomePage from './pages/HomePage.jsx';
import './App.css';

/**
 * Componente principal de la aplicación Event Planner
 * Configura el routing y las rutas principales
 */
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta de bienvenida */}
          <Route path="/" element={<WelcomePage />} />

          {/* Ruta del dashboard principal */}
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;