import { Model } from "objection";
//import Concierto from './concierto.model.js';
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
      contrasena: {
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


}
