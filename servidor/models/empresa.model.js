import { Model } from "objection";
import Concierto from "./concierto.models";

const express = require('express');
const app = express();
const { Pool } = require('pg');

// Configurar el middleware para procesar JSON
app.use(express.json());

//Definimos el modelo
export default class Empresa extends Model {

  // Nombre de la tabla
  static tableName = "promotora"; //TODO  ========================================   PROMOTORA   ===========================================

  // Clave primaria
  static idColumn = "email";

  // Esquema de datos
  static empresaSchema = {
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
      cif: {
        type: "string",
        maxLength: 8,
      },
      domicilio_social: {
        type: "string",
        maxLength: 64,
      },
      telefono: {
        type: "integer",
      },
      responsable: {
        type: "string",
        maxLength: 64,
      },
      euros: {
        type: "integer",
      }
    },
  };

  // Relaciones
  static relationMappings = () => ({        
    // Relación CARTELERA --> Para cada empresa, devuelve la propiedad "catalog" con la cartelera de esa empresa
    catalog: {
        relation: Model.ManyToManyRelation,
        modelClass: Concierto,
        join: {
            from: 'empresa.id',
            through: {
                modelClass: ShowTiming,
                from: 'show_timing.empresa_id',
                to: 'show_timing.concierto_id',
            },
            to: 'concierto.id',
        },
    },

    sessions: {
        relation: Model.HasManyRelation,
        modelClass: ShowTiming,
        join: {
            from: 'empresa.id',
            to: 'show_timing.empresa_id',
        }
    }
  });

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

// TODO Ruta para registrar una empresa ==================================

app.post('/empresas', async (req, res) => {
  const { nombre, email, password, cif, domicilio_social, telefono, responsable, euros } = req.body;
  
  //^ Validar que se proporcionen todos los campos requeridos
  if (!nombre || !email || !password || !cif || !domicilio_social || !telefono || !responsable || !euros) {
    return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
  }

  //^ Validar el formato del email
  if (!isValidEmail(email)) {
    return res.status(400).json({ mensaje: 'Formato de email inválido' });
  }

  //^ Validar el formato del CIF
  if (!isValidCIF(cif)) {
    return res.status(400).json({ mensaje: 'Formato de CIF inválido' });
  }
  
  try {
    //^ Guardar los datos de la empresa en la base de datos
    const query = 'INSERT INTO empresas (nombre, email, password, cif, domicilio, telefono, responsable, capital) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    const values = [nombre, email, password, cif, domicilio_social, telefono, responsable, euros, false]; // Establecer el campo "verificado" como false
    
    await pool.query(query, values);

    res.status(200).json({ mensaje: 'Registro exitoso. Su cuenta está pendiente de verificación.' });
  } catch (error) {
    console.error('Error al guardar los datos de la empresa:', error);
    res.status(500).json({ mensaje: 'Error al guardar los datos de la empresa' });
  }
});


//^ Función para validar el formato del email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

//^ Función para validar el formato del CIF
function isValidCIF(cif) {
  const cifRegex = /^[A-HJNP-SUW]{1}\d{7}[0-9A-J]$/;
  return cifRegex.test(cif);
}

//^ Función para validar el formato del número de teléfono
function isValidPhoneNumber(telefono) {
  const phoneRegex = /^\d{9}$/; // Formato de 9 dígitos
  return phoneRegex.test(telefono);
}


// TODO Ruta para eliminar una cuenta de empresa =================================================================
app.delete('/empresa/:id', async (req, res) => {
  const usuarioId = req.params.id;

  try {
    // Eliminar la cuenta de empresa de la base de datos
    const query = 'DELETE FROM empresa WHERE id = $1';
    const values = [usuarioId];

    await pool.query(query, values);

    res.status(200).json({ mensaje: 'Cuenta de empresa eliminada exitosamente' });
    
  } catch (error) {
    console.error('Error al eliminar la cuenta de empresa:', error);
    res.status(500).json({ mensaje: 'Error al eliminar la cuenta de empresa' });
  }
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});



