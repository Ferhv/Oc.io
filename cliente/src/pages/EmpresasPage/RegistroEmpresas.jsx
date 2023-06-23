import React, { useState } from 'react';
import axios from 'axios';

const InsertForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    cif: '',
    puerto: '',
    telefono: '',
    responsable: '',
    euros: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('registrarEmpresa', formData);
      console.log(response.data); // Maneja la respuesta del servidor según tus necesidades

     

      // Reinicia el formulario
      setFormData({
        nombre: '',
        email: '',
        password: '',
        cif: '',
        puerto: '',
        telefono: '',
        responsable: '',
        euros: ''
      });
    } catch (error) {
      if (error.response) {
        // El servidor ha respondido con un código de estado fuera del rango 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // La solicitud fue realizada pero no se recibió una respuesta
        console.log(error.request);
      } else {
        // Ocurrió un error al configurar la solicitud
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label>
        Contraseña:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>
      <label>
        CIF:
        <input type="text" name="cif" value={formData.cif} onChange={handleChange} />
      </label>
      <label>
        Puerto:
        <input type="text" name="puerto" value={formData.puerto} onChange={handleChange} />
      </label>
      <label>
        Teléfono:
        <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
      </label>
      <label>
        Responsable:
        <input type="text" name="responsable" value={formData.responsable} onChange={handleChange} />
      </label>
      <label>
        Euros:
        <input type="text" name="euros" value={formData.euros} onChange={handleChange} />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default InsertForm;





/*import React, { useState } from 'react';
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
*/