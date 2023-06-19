import { Model } from "objection";
import bcrypt from 'bcrypt';

//Definimos el modelo
export default class Empresa extends Model {

  // Nombre de la tabla
  static tableName = "empresa"; //TODO  ========================================   EMPRESA   ===========================================

  // Clave primaria
  static idColumn = "email";

  // Esquema de datos
  static jsonSchema = {
    type: "object",
    properties: {
      nombre: {
        type: "string",
      }, 
      email: {
        type: "string",
      },
      password: {
        type: "string",
      },
      cif: {
        type: "string",
      },
      puerto: {
        type: "string",
      },
      telefono: {
        type: "integer",
      },
      responsable: {
        type: "string",
      },
      euros: {
        type: "integer",
      }
    },
  };


  set unsecurePassword (unsecurePassword) {
    this.password = bcrypt.hashSync(unsecurePassword, bcrypt.genSaltSync(10))
  };

  verifyPassword (unsecurePassword, callback) {
    return bcrypt.compare(String(unsecurePassword), String(this.password), callback)

  }


}


