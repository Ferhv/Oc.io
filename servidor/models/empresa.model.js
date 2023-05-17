import { Model } from "objection";
import Concierto from "./concierto.model.js";
import bcrypt from 'bcrypt';

//Definimos el modelo
export default class Empresa extends Model {

  // Nombre de la tabla
  static tableName = "empresa"; //TODO  ========================================   EMPRESA   ===========================================

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
      },
      verificado: {
        type: "boolean"
      }
    },
  };


  set unsecurePassword (unsecurePassword) {
    this.password = bcrypt.hashSync(unsecurePassword, bcrypt.genSaltSync(10))
  };

  verifyPassword (unsecurePassword, callback) {
    return bcrypt.compare(String(unsecurePassword), String(this.password), callback)

  }

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



/*

// TODO Ruta para obtener la información de los conciertos de la empresa =====================================================================
app.get('/empresa/conciertos', async (req, res) => {
  try {
    // Obtener la información de los conciertos creados por la empresa desde la base de datos
    const conciertos = await Concierto.query().where('empresa_id', req.user.id);

    res.status(200).json(conciertos);
  } catch (error) {
    console.error('Error al obtener la información de los conciertos:', error);
    res.status(500).json({ mensaje: 'Error al obtener la información de los conciertos' });
  }
});



**/