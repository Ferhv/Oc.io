import { Model } from "objection";
//import Movie from './Movie.model.js';
//import ShowTiming from './ShowTiming.model.js';

const express = require('express');
const app = express();
const { Pool } = require('pg');

export default class Client extends Model {

  // Nombre de la tabla
  static tableName = "cliente";//TODO  ========================================   CLIENTE   ================================================

  // Clave primaria
  static idColumn = "email";

  // Esquema de datos
  static jsonSchema = {
    type: "object",
    properties: {
      id: {
        type: "integer",
      },
      nombre: {
        type: "string",
        maxLength: 64,
      },
      email: {
        type: "string",
        maxLength: 64,
      },
      password: {
        type: "string",
        maxLength: 64,
      },
      dni: {
        type: "string",
        maxLength: 9,
      },
      fecha: {
        type: "date",
      },
      telefono: {
        type: "integer",
      }
    },
  };

}



// Configuración de la conexión a la base de datos
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'oc.io_2023',
  password: 'root',
  port: 5432
});

// Configurar el middleware para procesar JSON
app.use(express.json());

// TODO  Ruta para registrar un cliente =================================================================================

app.post('/clientes', async (req, res) => {
  const { nombre, email, password, dni, fecha, telefono } = req.body;

  //^ Validar que se proporcionen todos los campos requeridos
  if (!nombre || !email || !password || !dni || !fecha || !telefono) {
    return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
  }

  //^ Validar el formato del email
  if (!isValidEmail(email)) {
    return res.status(400).json({ mensaje: 'Formato de email inválido' });
  }

  //^ Validar el formato del DNI
  if (!isValidDNI(dni)) {
    return res.status(400).json({ mensaje: 'Formato de DNI inválido' });
  }

  //^ Validar el formato de la fecha de nacimiento
  if (!isValidDate(fecha)) {
    return res.status(400).json({ mensaje: 'Formato de fecha inválido' });
  }

  //^ Validar el formato del número de teléfono
  if (!isValidPhoneNumber(telefono)) {
    return res.status(400).json({ mensaje: 'Formato de número de teléfono inválido' });
  }

  try {
    //^ Guardar los datos del cliente en la base de datos
    const query = 'INSERT INTO cliente (nombre, email, password, dni, fecha, telefono) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    const values = [nombre, email, password, dni, fecha, telefono, false]; 

    await pool.query(query, values);

    res.status(200).json({ mensaje: 'Cliente registrado exitosamente' });
  } catch (error) {
    console.error('Error al guardar los datos del cliente:', error);
    res.status(500).json({ mensaje: 'Error al guardar los datos del cliente' });
  }
});

//^ Función para validar el formato del email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

//^ Función para validar el formato del DNI
function isValidDNI(dni) {
  const dniRegex = /^\d{8}[A-HJ-NP-TV-Z]$/;
  return dniRegex.test(dni);
}

//^ Función para validar el formato de la fecha
function isValidDate(date) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(date);
}

//^ Función para validar el formato del número de teléfono
function isValidPhoneNumber(telefono) {
  const phoneRegex = /^\d{9}$/; // Formato de 9 dígitos
  return phoneRegex.test(telefono);
}


// TODO Ruta para eliminar una cuenta de cliente =================================================================
app.delete('/cliente/:id', async (req, res) => {
  const usuarioId = req.params.id;

  try {
    // Eliminar la cuenta de usuario de la base de datos
    const query = 'DELETE FROM cliente WHERE id = $1';
    const values = [usuarioId];

    await pool.query(query, values);

    res.status(200).json({ mensaje: 'Cuenta de cliente eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la cuenta de cliente:', error);
    res.status(500).json({ mensaje: 'Error al eliminar la cuenta de cliente' });
  }
});


// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
