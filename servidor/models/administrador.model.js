
import {Model} from 'objection'
import bcrypt from 'bcryptjs'

export default class Administrador extends Model {

  // Nombre de la tabla
  static tableName = "administrador";//TODO  ========================================   ADMINISTRADOR   =====================================

  // Clave primaria
  static idColumn = 'email';

  static jsonSchema = {
    type: 'object',
    required: ['email'],

    properties: {
      email: {type: 'string', default: ''},
      password: {type: 'string'}
    }
  };

  //& función que establece una contraseña segura para un usuario utilizando la biblioteca bcrypt en Node.js
  //& Toma una contraseña no segura y la convierte en una contraseña segura mediante el hashing con bcrypt y la almacena en el objeto
  set unsecurePassword (unsecurePassword) {
    this.password = bcrypt.hashSync(unsecurePassword, bcrypt.genSaltSync(10))
  };

  //& Verifica si una contraseña no segura coincide con una previamente almacenada en el objeto mediante el uso de la función bcrypt.compare()
  //& Devuelve un booleano que indica si la contraseña coincide o no.
  verifyPassword (unsecurePassword, callback) {
    return bcrypt.compare(String(unsecurePassword), String(this.password), callback)
  };

}

