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

export const LoginEmpresa = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  
  const navigate = useNavigate();
  /**Inicio de sesion */
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
            url: 'http://localhost:8080/loginEmpresa',
            method: 'POST',
            withCredentials: true,
            data: {
                email: email,
                password: password,
            }
        }).then(response => {
            if (!!response.data) {
              navigate('/cruceros');
              navigate(0); // <-- Forzamos que se actualice la página, actualizándose la cabecera
            }
        })
    }
  }

  return (
    <div>
      <Button onClick={handleClickOpen}>
        Iniciar sesión
      </Button>
      <Dialog open={open} onClose={handleClose}>/**Cerrar ventana */
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
} 

export default LoginEmpresa;