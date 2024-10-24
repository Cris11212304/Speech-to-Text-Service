import React, { useState } from 'react';
import computer from './images/Computer.jpg';
import analisis from './images/Analisis.jpg';
import './App.css';

function Reportes() {
  const [cc, setCc] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState(''); 
  const [resultado, setResultado] = useState('');

  const handleConsultar = () => {
    setResultado(true);
  };

  const handleLimpiar = () => {
    setCc('');
    setUsuario('');
    setContraseña('');
    setResultado(false);
  };

  return (
    <div className="App">
      <main className="main-content">
        <div className="content">
          <p>Ingrese los datos para consultar sus reportes:</p>
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
          <div className="form-group">
            <button onClick={handleConsultar}>Consultar</button>
            <button onClick={handleLimpiar}>Limpiar</button>
          </div>

          {resultado && (
            <table className="reportes-table">
              <thead>
                <tr>
                  <th># Informe</th>
                  <th>PDF</th>
                </tr>
              </thead>
              <tbody>
                {/* Aquí agregaríamos filas dinámicamente si tuviéramos datos reales */}
              </tbody>
            </table>
          )}
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

export default Reportes;
