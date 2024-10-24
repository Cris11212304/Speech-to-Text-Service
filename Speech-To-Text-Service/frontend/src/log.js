import React, { useState } from 'react';
import './App.css';

function Log() {
  const [cc, setCc] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleIngresar = () => {
    // Aquí puedes agregar la lógica de autenticación en el futuro
    alert('Ingresando...');
  };

  const handleLimpiar = () => {
    setCc('');
    setUsuario('');
    setContraseña('');
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Iniciar Sesión</h2>
        <div className="form-group">
          <label>CC:</label>
          <input
            type="text"
            value={cc}
            onChange={(e) => setCc(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Usuario:</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
        </div>
        <div className="form-buttons">
          <button onClick={handleIngresar}>Ingresar</button>
          <button onClick={handleLimpiar}>Limpiar</button>
        </div>
      </div>
    </div>
  );
}

export default Log;
