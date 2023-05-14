import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@material-ui/core';

const RegistroEmpresaForm = () => {
  //useState es una función que devuelve un estado y una función para actualizar ese estado
  //^ empresa es el estado que almacena los datos del formulario de registro de la empresa
  //^ setEmpresa se utiliza para actualizar el estado de empresa
  const [empresa, setEmpresa] = useState({
    nombre: '',
    email: '',
    password: '',
    cif: '',
    domicilio_social: '',
    telefono: '',
    responsable: '',
    euros: ''
  });

  //^ Controlador de eventos que se utiliza para manejar los cambios en los campos del formulario de registro de la empresa
  const handleChange = (e) => {
    setEmpresa({ ...empresa, [e.target.name]: e.target.value });
  };

  //^ Controlador de eventos que se utiliza para manejar la acción de enviar el formulario de registro de la empresa.
  const handleSubmit = (e) => {
    
    e.preventDefault();
    // Aquí puedes realizar la lógica para guardar los datos de la empresa en la base de datos
    console.log(empresa);
    
    // Limpiar el formulario después de enviar
    setEmpresa({
      nombre: '',
      email: '',
      password: '',
      cif: '',
      domicilio_social: '',
      telefono: '',
      responsable: '',
      euros: ''
    });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center">Registro de Empresa</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre de la empresa"
          name="nombre"
          value={empresa.nombre}
          onChange={handleChange} //se encargará de actualizar el estado empresa con el nuevo valor ingresado en el campo
          required //Indica que el campo de entrada es obligatorio 
          fullWidth
          margin="normal"
        />

        <TextField
          label="Email"
          type="email"
          name="email"
          value={empresa.email}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="Contraseña"
          type="password"
          name="password"
          value={empresa.password}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="CIF"
          name="cif"
          value={empresa.cif}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="Domicilio Social"
          name="domicilio_social"
          value={empresa.domicilio_social}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="Teléfono"
          name="telefono"
          value={empresa.telefono}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="Persona Responsable"
          name="responsable"
          value={empresa.responsable}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="Capital Social (en euros)"
          type="number"
          name="euros"
          value={empresa.euros}
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

export default RegistroEmpresaForm;
