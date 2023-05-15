
//import Movie from './Movie.model.js';
//import ShowTiming from './ShowTiming.model.js';
import {Model} from 'objection'
import bcrypt from 'bcryptjs'

export default class Administrador extends Model {

  // Nombre de la tabla
  static tableName = "administrador";//TODO  ========================================   ADMINISTRADOR   =====================================

  // Clave primaria
  static idColumn = 'email';

  static jsonSchema = {
    type: 'object',
    required: ['email'],

    properties: {
      email: {type: 'string', default: ''},
      password: {type: 'string'}
    }
  };

  //& función que establece una contraseña segura para un usuario utilizando la biblioteca bcrypt en Node.js
  //& Toma una contraseña no segura y la convierte en una contraseña segura mediante el hashing con bcrypt y la almacena en el objeto
  set unsecurePassword (unsecurePassword) {
    this.password = bcrypt.hashSync(unsecurePassword, bcrypt.genSaltSync(10))
  };

  //& Verifica si una contraseña no segura coincide con una previamente almacenada en el objeto mediante el uso de la función bcrypt.compare()
  //& Devuelve un booleano que indica si la contraseña coincide o no.
  verifyPassword (unsecurePassword, callback) {
    return bcrypt.compare(String(unsecurePassword), String(this.password), callback)
  };

}

const express = require('express');
const app = express();
const { Pool } = require('pg');

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

// * =======================================================================  EMPRESA ====================================================

// TODO Ruta para que el administrador obtenga un listado de empresas pendientes de autorización =============================
app.get('/empresas/pendientes', async (req, res) => {
  try {
    // Obtener las empresas pendientes de autorización desde la base de datos
    const query = 'SELECT * FROM empresas WHERE verificado = false';
    const result = await pool.query(query);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener las empresas pendientes de autorización:', error);
    res.status(500).json({ mensaje: 'Error al obtener las empresas pendientes de autorización' });
  }
});

// TODO Ruta para que el administrador autorice una empresa promotora =========================================
app.put('/empresas/:id/autorizar', async (req, res) => {
  const empresaId = req.params.id;

  try {
    // Autorizar la empresa actualizando el campo "verificado" a true en la base de datos
    const query = 'UPDATE empresas SET verificado = true WHERE id = $1';
    const values = [empresaId];

    await pool.query(query, values);

    res.status(200).json({ mensaje: 'Empresa autorizada exitosamente' });
  } catch (error) {
    console.error('Error al autorizar la empresa:', error);
    res.status(500).json({ mensaje: 'Error al autorizar la empresa' });
  }
});

// TODO  Ruta para que el administrador elimine una cuenta de promotora ====================================================
app.delete('/empresas/:id', async (req, res) => {
  const promotoraId = req.params.id;

  try {
    // Eliminar la cuenta de promotora de la base de datos
    const query = 'DELETE FROM promotoras WHERE id = $1';
    const values = [promotoraId];

    await pool.query(query, values);

    res.status(200).json({ mensaje: 'Cuenta de promotora eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la cuenta de promotora:', error);
    res.status(500).json({ mensaje: 'Error al eliminar la cuenta de promotora' });
  }
});




// * =======================================================================  CLIENTE ====================================================

// TODO Ruta para que el administrador obtenga un listado de empresas pendientes de autorización =============================
app.get('/cliente/pendientes', async (req, res) => {
  try {
    // Obtener las cliente pendientes de autorización desde la base de datos
    const query = 'SELECT * FROM cliente WHERE verificado = false';
    const result = await pool.query(query);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener las cliente pendientes de autorización:', error);
    res.status(500).json({ mensaje: 'Error al obtener las cliente pendientes de autorización' });
  }
});

// TODO Ruta para que el administrador autorice una cuenta de CLIENTE ==================================================
app.put('/cliente/:id/autorizar', async (req, res) => {
  const promotoraId = req.params.id;

  try {
    // Autorizar la cuenta de promotora actualizando el campo "autorizado" a true en la base de datos
    const query = 'UPDATE cliente SET autorizado = true WHERE id = $1';
    const values = [promotoraId];

    await pool.query(query, values);

    res.status(200).json({ mensaje: 'Cuenta de cliente autorizada exitosamente' });
  } catch (error) {
    console.error('Error al autorizar la cuenta de cliente:', error);
    res.status(500).json({ mensaje: 'Error al autorizar la cuenta de cliente' });
  }
});

//TODO Ruta para que el administrador elimine una cuenta de cliente =======================================================
app.delete('/cliente/:id', async (req, res) => {
  const promotoraId = req.params.id;

  try {
    // Eliminar la cuenta de promotora de la base de datos
    const query = 'DELETE FROM cliente WHERE id = $1';
    const values = [promotoraId];

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


