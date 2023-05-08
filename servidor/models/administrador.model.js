import { Model } from "objection";
//import Movie from './Movie.model.js';
//import ShowTiming from './ShowTiming.model.js';
export default class Empresa extends Model {
  // Nombre de la tabla
  static tableName = "administrador";

  // Clave primaria
  static idColumn = "email";

  // Esquema de datos
  static jsonSchema = {
    type: "object",
    properties: {
      id: {
        type: "integer",
      },
      email: {
        type: "varchar",
        maxLength: 64,
      },
      contrasena: {
        type: "varchar",
        maxLength: 64,
      }
    },
  };

}
