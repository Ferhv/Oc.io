import { Model } from "objection";
import  Empresa  from './empresa.model.js';

export default class Crucero extends Model {

  // Nombre de la tabla
  static tableName = "crucero";//TODO  ========================================   CONCIERTO   =============================================

  // Clave primaria
  static idColumn = "nombre_evento";

  // Esquema de datos
  static jsonSchema = {
    type: "object",
    properties: {
      nombre: {
        type: "string",
      },
      puerto_origen: {
        type: "string",
      },
      ubicacion: {
        type: "string",
      },
      aforo: {
        type: "integer",
      },
      descripcion: {
        type: "string",
      },
      fecha: {
        type: "string",
      },
      hora: {
        type: "string",
      },
      precio: {
        type: "integer",
      },
      empresa_email: {
        type: "string",
      }
    },
  };


  static relationMappings = { //Se define una relaccion llamada empresa
    empresa: {
      relation: Model.BelongsToOneRelation, //Un crucero pertenece a una empresa
      modelClass: Empresa,
      join: { //Especifica los detalles de la relación
        from: "crucero.empresa_email",
        to: "empresa.email",
      },
    },
  };

}

