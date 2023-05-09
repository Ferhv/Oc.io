import { Model } from "objection";
import Concierto from "./concierto.models";
export default class Empresa extends Model {

  // Nombre de la tabla
  static tableName = "promotora"; //TODO  ========================================   PROMOTORA   ===========================================

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
        type: "varchar",
        maxLength: 64,
      },
      password: {
        type: "varchar",
        maxLength: 64,
      },
      cif: {
        type: "varchar",
        maxLength: 8,
      },
      domicilio_social: {
        type: "varchar",
        maxLength: 64,
      },
      telefono: {
        type: "integer",
      },
      responsable: {
        type: "varchar",
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
