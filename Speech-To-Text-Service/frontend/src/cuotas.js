// src/Cuotas.js
import React, { useState } from 'react';
import computer from './images/Computer.jpg';
import analisis from './images/Analisis.jpg';
import './App.css';

function Cuotas() {
  const [nombre, setNombre] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [resultado, setResultado] = useState('');

  const handleConsultar = () => {
    setResultado(`En este momento tiene 10 cuotas restantes, para aumentarlo consulta con el equipo.`);
  };

  const handleLimpiar = () => {
    setNombre('');
    setUsuario('');
    setContraseña('');
    setResultado('');
  };

  return (
    <div className="App">
      <main className="main-content">
        <div className="content">
          <p>Ingrese los datos para consultar sus cuotas:</p>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
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
          <div className="form-group">
            <button onClick={handleConsultar}>Consultar</button>
            <button onClick={handleLimpiar}>Limpiar</button>
          </div>
          {resultado && <p className="result">{resultado}</p>}
        </div>

        <div className="images">
          <div className="branding-image">
            <img src={computer} alt="Imagen de marca" />
          </div>
          <div className="example-image">
            <img src={analisis} alt="Imagen de información" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Cuotas;
