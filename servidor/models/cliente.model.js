import { Model } from "objection";
import express from 'express';
import bcrypt from 'bcrypt';

export default class Cliente extends Model {

  // Nombre de la tabla
  static tableName = "cliente";//TODO  ========================================   CLIENTE   ================================================

  // Clave primaria
  static idColumn = "email";

  // Esquema de datos
  static jsonSchema = {
    type: "object",
    properties: {
      nombre: {
        type: "string",
        maxLength: 64,
      },
      email: {
        type: "string",
        maxLength: 64,
      },
      password: {
        type: "string",
        maxLength: 64,
      },
      dni: {
        type: "string",
        maxLength: 9,
      },
      fecha: {
        type: "string",
      },
      telefono: {
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