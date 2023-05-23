import { Model } from "objection";
import  Empresa  from './empresa.model.js';

export default class Concierto extends Model {

  // Nombre de la tabla
  static tableName = "concierto";//TODO  ========================================   CONCIERTO   =============================================

  // Clave primaria
  static idColumn = "nombre_evento";

  // Esquema de datos
  static jsonSchema = {
    type: "object",
    properties: {
      nombre_evento: {
        type: "string",
      },
      nombre_artista: {
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
      relation: Model.BelongsToOneRelation, //Un concierto pertenece a una empresa
      modelClass: Empresa,
      join: { //Especifica los detalles de la relación
        from: "concierto.empresa_email",
        to: "empresa.email",
      },
    },
  };

}

