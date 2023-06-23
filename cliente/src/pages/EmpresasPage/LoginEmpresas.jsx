import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', formData);
      if (response.status === 200) {
        // Acceso exitoso, maneja la respuesta según tus necesidades
        console.log(response.data);
      } else {
        // Acceso denegado, maneja el error según tus necesidades
        console.log('Error en la autenticación');
      }
    } catch (error) {
      console.error(error);
      // Maneja los errores según tus necesidades
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label>
        Contraseña:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>
      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default LoginForm;
