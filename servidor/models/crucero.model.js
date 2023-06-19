import { Model } from "objection";
import  Empresa  from './empresa.model.js';

export default class Crucero extends Model {

  // Nombre de la tabla
  static tableName = "crucero";//TODO  ========================================   CRUCERO   =============================================

  // Clave primaria
  static idColumn = "id";

  // Esquema de datos
  static jsonSchema = {
    type: "object",
    properties: {
      id: {
        type: "integer",
      },
      nombre: {
        type: "string",
      },
      puerto: {
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
      },
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

