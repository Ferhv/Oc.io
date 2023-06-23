import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';

const RegistroEmpresas = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cif, setCif] = useState('');
  const [puerto, setPuerto] = useState('');
  const [telefono, setTelefono] = useState('');
  const [responsable, setResponsable] = useState('');
  const [euros, setEuros] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Realizar la solicitud de registro de la empresaa
    axios
      .post('http://localhost:8080/registrarEmpresa', {
        nombre,
        email,
        password,
        cif,
        puerto,
        telefono,
        responsable,
        euros,
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
    setCif('');
    setPuerto('');
    setTelefono('');
    setResponsable('');
    setEuros('');
  };

  return (
<div>
  <h1>Registro de Empresa Naivera</h1>
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
      <label htmlFor="cif">CIF:</label>
      <input
        type="text"
        id="cif"
        value={cif}
        onChange={(e) => setCif(e.target.value)}
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
      <label htmlFor="telefono">Teléfono:</label>
      <input
        type="text"
        id="telefono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />
    </div>

    <div>
      <label htmlFor="responsable">Responsable:</label>
      <input
        type="text"
        id="responsable"
        value={responsable}
        onChange={(e) => setResponsable(e.target.value)}
      />
    </div>

    <div>
      <label htmlFor="euros">Euros:</label>
      <input
        type="text"
        id="euros"
        value={euros}
        onChange={(e) => setEuros(e.target.value)}
      />
    </div>

    <Button>
      <Link to="/RegistroEmpresas">Registrar</Link>
    </Button>
    
  </form>
</div>

  );
};

export default RegistroEmpresas;
