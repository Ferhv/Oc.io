import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@material-ui/core';


const RegistroConciertoForm = () => {
  const [concierto, setConcierto] = useState({
    nombre_evento: '',
    nombre_artista: '',
    ubicacion: '',
    aforo: '',
    descripcion: '',
    fecha: '',
    precio: ''
  });

  const handleChange = (e) => {
    setConcierto({ ...concierto, [e.target.nombre_evento]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar la lógica para guardar los datos del concierto en la base de datos
    console.log(concierto);
    // Limpiar el formulario después de enviar
    setConcierto({
      nombre_evento: '',
      nombre_artista: '',
      ubicacion: '',
      aforo: '',
      descripcion: '',
      fecha: '',
      precio: ''
    });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center">Registro del Concierto</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre del Concierto"
          name="nombre_evento"
          value={concierto.nombre_evento}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="Nombre del Artista"
          name="nombre_artista"
          value={concierto.nombre_artista}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />      

        <TextField
          label="Ubicacion"
          name="ubicacion"
          value={concierto.ubicacion}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="Aforo"
          name="aforo"
          value={concierto.aforo}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />  

        <TextField
          label="Fehca"
          name="fecha"
          value={concierto.fecha}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />  

        <TextField
          label="Precio de la Entrada"
          name="precio"
          value={concierto.precio}
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

export default RegistroConciertoForm;
