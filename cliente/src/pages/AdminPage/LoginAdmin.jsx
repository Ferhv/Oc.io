import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();

  const [clientFormData, setClientFormData] = useState({
    email: '',
    password: ''
  });

  const [companyFormData, setCompanyFormData] = useState({
    email: '',
    password: ''
  });

  const [adminFormData, setAdminFormData] = useState({
    email: '',
    password: ''
  });

  const handleClientChange = (e) => {
    setClientFormData({ ...clientFormData, [e.target.name]: e.target.value });
  };

  const handleCompanyChange = (e) => {
    setCompanyFormData({ ...companyFormData, [e.target.name]: e.target.value });
  };

  const handleAdminChange = (e) => {
    setAdminFormData({ ...adminFormData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (endpoint, formData) => {
    try {
      const response = await axios.post(endpoint, formData);
      if (response.status === 200) {
        // Acceso exitoso, maneja la respuesta según tus necesidades
        console.log(response.data);
        if (endpoint === '/loginAdmin') {
          // Redirigir a la página VistaEmpresas en caso de iniciar sesión como admin
          navigate('/VistaEmpresas');
        }
      } else {
        // Acceso denegado
        console.log('Error en la autenticación');
      }
    } catch (error) {
      console.error(error);
      // M
    }
  };

  const handleClientLogin = (e) => {
    e.preventDefault();
    handleLogin('/login', clientFormData);
  };

  const handleCompanyLogin = (e) => {
    e.preventDefault();
    handleLogin('/loginEmpresa', companyFormData);
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    handleLogin('/loginAdmin', adminFormData);
  };

  return (
    <div>
      <h2>Cliente</h2>
      <form onSubmit={handleClientLogin}>
        <label>
          Email:
          <input type="email" name="email" value={clientFormData.email} onChange={handleClientChange} />
        </label>
        <label>
          Contraseña:
          <input type="password" name="password" value={clientFormData.password} onChange={handleClientChange} />
        </label>
        <button type="submit">Iniciar sesión</button>
      </form>

      <h2>Empresa</h2>
      <form onSubmit={handleCompanyLogin}>
        <label>
          Email:
          <input type="email" name="email" value={companyFormData.email} onChange={handleCompanyChange} />
        </label>
        <label>
          Contraseña:
          <input type="password" name="password" value={companyFormData.password} onChange={handleCompanyChange} />
        </label>
        <button type="submit">Iniciar sesión</button>
      </form>

      <h2>Admin</h2>
      <form onSubmit={handleAdminLogin}>
        <label>
          Email:
          <input type="email" name="email" value={adminFormData.email} onChange={handleAdminChange} />
        </label>
        <label>
          Contraseña:
          <input type="password" name="password" value={adminFormData.password} onChange={handleAdminChange} />
        </label>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default LoginForm;






/*import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const LoginAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/loginAdmin', {
        email,
        password,
      });

      if (response.status === 200) {
        // Login exitoso, redireccionar o realizar alguna acción adicional
        console.log('Inicio de sesión exitoso');
      } else {
        // Error de inicio de sesión
        setError('Error en el inicio de sesión');
      }
    } catch (error) {
      // Error en la solicitud
      setError('Error en la solicitud');
    }
  };

  return (
    <div>
      <h1>Iniciar sesión como administrador</h1>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <TextField
            type="password"
            label="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Iniciar sesión
        </Button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginAdmin;*/


/*
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import {useState, useEffect} from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


export const LoginAdmin = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const performLogin = (event) => {
    event.preventDefault();
    setEmailError(false);
    setPasswordError(false);

    if (email === '') setEmailError(true);
    if (password === '') setPasswordError(true);

    if (!!email && !!password) {
        axios({
            url: 'http://localhost:8080/loginAdmin',
            method: 'POST',
            withCredentials: true,
            data: {
                email: email,
                password: password,
            }
        }).then(response => { 
            if (!!response.data) {
              navigate('/crucerosDisponibles');
              navigate(0); // <-- Forzamos que se actualice la página, actualizándose la cabecera
            }
        })
    }
  }

  return (
    <div>
      <h1>LOGIN</h1>
      <Button onClick={handleClickOpen}>
        Iniciar sesión
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Iniciar sesión</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            onChange={e => setEmail(e.target.value)}
            margin="dense"
            id="email"
            label="Usuario"
            fullWidth
            variant="standard"
          />
                    <TextField
            autoFocus
            onChange={e => setPassword(e.target.value)}
            margin="dense"
            id="password"
            label="Contraseña"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={performLogin}>Iniciar sesión</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
} */