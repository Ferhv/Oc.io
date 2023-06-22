import React, { useState } from 'react';
import axios from 'axios';

const RegistroClientes = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dni, setDni] = useState('');
  const [fecha, setFecha] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Realizar la solicitud de registro de la empresa
    axios
      .post('http://localhost:8080/registrarCliente', {
        nombre, 
        email, 
        password, 
        dni, 
        fecha, 
        telefono,
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
    setEmail('');
    setPassword('');
    setDni('');
    setFecha('');
    setTelefono('');
  };

  return (
<div>
  <h1>Registro de Cliente</h1>
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
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    <div>
      <label htmlFor="password">Contraseña:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    <div>
      <label htmlFor="dni">DNI:</label>
      <input
        type="text"
        id="dni"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
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
      <label htmlFor="telefono">Teléfono:</label>
      <input
        type="text"
        id="telefono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />
    </div>

    <button type="submit">Registrar</button>
  </form>
</div>

  );
};

export default RegistroClientes;
