import { Model } from "objection";
import Empresa from './empresa.model.js';
//import ShowTiming from './ShowTiming.model.js';

const express = require('express');
const app = express();
const { Pool } = require('pg');

export default class Concierto extends Model {

  // Nombre de la tabla
  static tableName = "concierto";//TODO  ========================================   CONCIERTO   =============================================

  // Clave primaria
  static idColumn = "nombre_evento";

  // Esquema de datos
  static jsonSchema = {
    type: "object",
    properties: {
      id: {
        type: "integer",
      },
      nombre_evento: {
        type: "string",
        maxLength: 64,
      },
      nombre_artista: {
        type: "string",
        maxLength: 64,
      },
      ubicacion: {
        type: "string",
        maxLength: 255,
      },
      aforo: {
        type: "integer",
      },
      descripcion: {
        type: "string",
        maxLength: 255,
      },
      fecha: {
        type: "date",
      },
      precio: {
        type: "integer",
      }
    },
  };

  // Relaciones
  static relationMappings = () => ({
    projections: {
        relation: Model.ManyToManyRelation,
        modelClass: Empresa,
        join: {
            from: 'concierto.id',
            through: {
                modelClass: ShowTiming,
                from: 'show_timing.concierto_id',
                to: 'show_timing.empresa_id'
            },
            to: 'empresa.id'
        }
    },
    sessions: {
        relation: Model.HasManyRelation,
        modelClass: ShowTiming,
        join: {
            from: 'concierto.id',
            to: 'show_timing.concierto_id'
        },

    }
  })
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

// TODO Ruta para registrar un CONCIERTO ==========================================================
app.post('/eventos', async (req, res) => {
  const { nombre_evento, nombre_artista, ubicacion, aforo, descripcion, fecha, precio } = req.body;

  //^ Validar que se proporcionen todos los campos requeridos
  if (!nombre_evento || !nombre_artista || !ubicacion || !aforo || !descripcion || !fecha || !precio) {
    return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
  }

  try {
    //^ Guardar los datos del evento en la base de datos
    const query = 'INSERT INTO eventos (nombre_evento, nombre_artista, ubicacion, aforo, descripcion, fecha, precio) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    const values = [nombre, artista, ubicacion, aforo, descripcion, fecha, precio];

    await pool.query(query, values);

    res.status(200).json({ mensaje: 'Evento registrado exitosamente' });
  } catch (error) {
    console.error('Error al guardar los datos del evento:', error);
    res.status(500).json({ mensaje: 'Error al guardar los datos del evento' });
  }
});

//^ Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
