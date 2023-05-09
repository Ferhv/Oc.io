import { Model } from "objection";
import Empresa from './empresa.model.js';
//import ShowTiming from './ShowTiming.model.js';

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
        modelClass: Promotora,
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
