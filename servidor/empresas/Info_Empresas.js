import { useEffect, useState } from 'react';
import axios from 'axios';

const EmpresaDashboard = () => {
  const [conciertos, setConciertos] = useState([]);

  useEffect(() => {
    // Obtener la información de los conciertos de la empresa desde el backend
    const fetchConciertos = async () => {
      try {
        const response = await axios.get('/empresa/conciertos');
        setConciertos(response.data);
      } catch (error) {
        console.error('Error al obtener la información de los conciertos:', error);
      }
    };

    fetchConciertos();
  }, []);

  const crearConcierto = async () => {
    // Lógica para crear un nuevo concierto y enviar los datos al backend
    // después de que se haya creado exitosamente, actualizar la lista de conciertos
  };

  return (
    <div>
      <h1>Información de conciertos</h1>
      {conciertos.map((concierto) => (
        <div key={concierto.id}>
          {/* Mostrar la información del concierto */}
        </div>
      ))}
      <button onClick={crearConcierto}>Crear nuevo concierto</button>
    </div>
  );
};

export default EmpresaDashboard;
