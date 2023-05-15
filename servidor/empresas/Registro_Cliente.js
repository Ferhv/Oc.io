import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@material-ui/core';



const RegistroClienteForm = () => {
  const [cliente, setCliente] = useState({
    nombre: '',
    email: '',
    password: '',
    dni: '',
    fecha: '',
    telefono: ''
  });

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar la lógica para guardar los datos de la empresa en la base de datos
    console.log(cliente);
    // Limpiar el formulario después de enviar
    setEmpresa({
      nombre: '',
      email: '',
      password: '',
      dni: '',
      fecha: '',
      telefono: ''
    });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center">Registro de Cliente</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          name="nombre"
          value={cliente.nombre}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="Email"
          type="email"
          name="email"
          value={cliente.email}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="Contraseña"
          type="password"
          name="password"
          value={cliente.password}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="DNI"
          name="dni"
          value={cliente.dni}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="Fecha"
          name="fecha"
          value={cliente.fecha}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="Teléfono"
          name="telefono"
          value={cliente.telefono}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Registrar
        </Button>
      </form>
    </Container>
  );
};

export default RegistroClienteForm;
