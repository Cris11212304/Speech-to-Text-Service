import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa'; // Asegúrate de tener react-icons instalado
import computer from './images/Computer.jpg';
import analisis from './images/Analisis.jpg';
import Cuotas from './cuotas';
import Reportes from './reporte';
import Log from './log';
import './App.css';

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Simula autenticación
  const [selectedService, setSelectedService] = useState(''); // Guarda el servicio seleccionado
  const [analysisType, setAnalysisType] = useState(''); // Guarda el tipo de análisis seleccionado
  const [customCategories, setCustomCategories] = useState(''); // Categorías personalizadas
  const [file, setFile] = useState(null); // Guarda el archivo seleccionado
  const [textFieldName, setTextFieldName] = useState(''); // Guarda el nombre del campo de texto
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleGenerate = () => {
    console.log("Botón de generar análisis presionado");

    if (!selectedService) {
      alert('Por favor, selecciona un tipo de análisis.');
      return;
    }

    if (!analysisType) {
      alert('Por favor, selecciona un tipo de análisis en la lista desplegable.');
      return;
    }

    if (analysisType === 'custom' && !customCategories) {
      alert('Por favor, ingresa tus categorías personalizadas.');
      return;
    }

    if (!file) {
      alert('Por favor, sube un archivo para analizar.');
      return;
    }

    if (!textFieldName) {
      alert('Por favor, ingresa el nombre del campo de texto en tu archivo.');
      return;
    }

    let categories = analysisType === 'custom' ? customCategories : getCategories(analysisType);

    if (!isAuthenticated) {
      console.log("Usuario no autenticado, redirigiendo a la página de login");
      navigate('/ingresar');
    } else {
      console.log("Usuario autenticado, realizando llamada a la API");

      const formData = new FormData();
      formData.append('file', file);
      formData.append('selectedService', selectedService);
      formData.append('categories', categories);
      formData.append('textFieldName', textFieldName); // Agregamos el nuevo campo

      fetch('http://127.0.0.1:8000/generate-analysis', {
        method: 'POST',
        body: formData,
      })
        .then(response => {
          console.log("Respuesta recibida de la API", response);
          return response.json();
        })
        .then(data => {
          console.log('Análisis generado:', data);
          alert(`Análisis de ${selectedService} generado correctamente para las categorías: ${categories}`);
        })
        .catch(error => {
          console.error('Error al generar análisis:', error);
        });
    }
  };

  const getCategories = (type) => {
    switch (type) {
      case 'basic':
        return 'positivo, negativo, neutral';
      case 'advanced':
        return 'frustración, gratitud, groserías, amenazas, neutral';
      case 'complaints':
        return 'chatbot, webpage, time, agent solution';
      default:
        return '';
    }
  };

  return (
    <div className="main-content">
      <div className="content">
        <h1>¡Crea tu propio análisis en cuestión de minutos!</h1>
        <p>
          <strong>Speech to Text</strong> es una plataforma diseñada para crear análisis de
          sentimiento, de negocio, o cualquier aspecto deseado totalmente empoderada en IA.
        </p>
        <p className="service-title">Elige el servicio:</p>
        <div className="service-options">
          <label className={`option ${selectedService === 'llamadas' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="service"
              value="llamadas"
              onChange={(e) => setSelectedService(e.target.value)}
            />
            {selectedService === 'llamadas' && <FaCheckCircle className="check-icon" />}
            Análisis de llamadas
          </label>
          <label className={`option ${selectedService === 'texto' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="service"
              value="texto"
              onChange={(e) => setSelectedService(e.target.value)}
            />
            {selectedService === 'texto' && <FaCheckCircle className="check-icon" />}
            Análisis de texto
          </label>
        </div>

        <p className="analysis-title">Selecciona el tipo de análisis:</p>
        <select
          value={analysisType}
          onChange={(e) => setAnalysisType(e.target.value)}
          className="custom-select"
        >
          <option value="">Seleccione un tipo de análisis</option>
          <option value="basic">Análisis de sentimiento básico</option>
          <option value="advanced">Análisis de sentimiento avanzado</option>
          <option value="complaints">Análisis por quejas</option>
          <option value="custom">Análisis personalizado</option>
        </select>

        {analysisType === 'custom' && (
          <div className="custom-categories fade-in">
            <label>Ingresa tus categorías (separadas por comas):</label>
            <input
              type="text"
              value={customCategories}
              onChange={(e) => setCustomCategories(e.target.value)}
              className="custom-input"
            />
          </div>
        )}

        <div className="text-field-name">
          <label>Nombre del campo de texto en el archivo:</label>
          <input
            type="text"
            value={textFieldName}
            onChange={(e) => setTextFieldName(e.target.value)}
            className="custom-input"
          />
        </div>

        <div className="file-upload">
          <label>Sube tu archivo (.zip o .csv):</label>
          <input type="file" onChange={handleFileChange} className="file-input" />
        </div>

        <button className="generate-button" onClick={handleGenerate}>
          Generar Análisis
        </button>
      </div>
      <div className="images">
        <div className="branding-image">
          <img src={computer} alt="Imagen de marca" className="fade-in" />
        </div>
        <div className="example-image">
          <img src={analisis} alt="Imagen de información" className="fade-in" />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="navbar">
            <h1 className="logo">Speech to Text</h1>
            <nav className="nav-buttons">
              <Link to="/">Inicio</Link>
              <Link to="/cuotas">Cuotas</Link>
              <Link to="/reportes">Reportes</Link>
              <Link to="/ingresar">Ingresar</Link>
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cuotas" element={<Cuotas />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/ingresar" element={<Log />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
