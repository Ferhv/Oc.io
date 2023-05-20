import { Model } from "objection";

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



}

