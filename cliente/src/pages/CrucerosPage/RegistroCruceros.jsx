import React, { useState } from 'react';
import axios from 'axios';

const RegistroCruceros = () => {
  const [nombre, setNombre] = useState('');
  const [puerto, setPuerto] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [aforo, setAforo] = useState('');
  const [descripcion, setDesc] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [precio, setPrecio] = useState('');
  const [empresa_email, setEmpresa] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Realizar la solicitud de registro de la empresa
    axios
      .post('http://localhost:8080/registrarCrucero', {
        nombre, 
        puerto, 
        ubicacion, 
        aforo, 
        descripcion, 
        fecha, 
        hora, 
        precio, 
        empresa_email,
      })
      .then((response) => {
        // Manejar la respuesta de la solicitud POST según sea necesario
        console.log(response.data);
      })
      .catch((error) => {
        // Manejar el error de la solicitud POST según sea necesario
        console.error(error);
      });

    // Restablecer los campos del formulario después del envío
    setNombre('');
    setPuerto('');
    setUbicacion('');
    setAforo('');
    setDesc('');
    setFecha('');
    setHora('');
    setPrecio('');
    setEmpresa('');
  };

  return (
<div>
  <h1>Registro de Crucero</h1>
  <form onSubmit={handleSubmit} className="registration-form">
    <div>
      <label htmlFor="nombre">Nombre:</label>
      <input
        type="text"
        id="nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
    </div>

    <div>
      <label htmlFor="puerto">Puerto:</label>
      <input
        type="text"
        id="puerto"
        value={puerto}
        onChange={(e) => setPuerto(e.target.value)}
      />
    </div>

    <div>
      <label htmlFor="ubicacion">Ubicacion:</label>
      <input
        type="text"
        id="ubicacion"
        value={ubicacion}
        onChange={(e) => setUbicacion(e.target.value)}
      />
    </div>

    <div>
      <label htmlFor="aforo">Aforo:</label>
      <input
        type="text"
        id="aforo"
        value={aforo}
        onChange={(e) => setAforo(e.target.value)}
      />
    </div>

    <div>
      <label htmlFor="descripcion">Desc:</label>
      <input
        type="text"
        id="descripcion"
        value={descripcion}
        onChange={(e) => setDesc(e.target.value)}
      />
    </div>

    <div>
      <label htmlFor="fecha">Fecha:</label>
      <input
        type="text"
        id="fecha"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />
    </div>

    <div>
      <label htmlFor="hora">Hora:</label>
      <input
        type="text"
        id="hora"
        value={hora}
        onChange={(e) => setHora(e.target.value)}
      />
    </div>

    <div>
      <label htmlFor="precio">Precio:</label>
      <input
        type="text"
        id="precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />
    </div>

    <div>
      <label htmlFor="empresa">Empresa:</label>
      <input
        type="text"
        id="empresa"
        value={empresa_email}
        onChange={(e) => setEmpresa(e.target.value)}
      />
    </div>


    <button type="submit">Registrar</button>
  </form>
</div>

  );
};

export default RegistroCruceros;
