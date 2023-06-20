import { Model } from "objection";
import  Crucero  from './crucero.model.js';

export default class Compra extends Model {

  // Nombre de la tabla
  static tableName = "compra";//TODO  ========================================   COMPRA   =============================================

  // Clave primaria
  static idColumn = "id";

  // Esquema de datos
  static jsonSchema = {
    type: "object",
    properties: {
      id: {
        type: "integer",
      },
      cruceroId: {
        type: "integer",
      },
      cantidadbilletes: {
        type: "integer",
      },
      cardnumber: {
        type: "string",
      },
      cvv: {
        type: "string",
      },
      expireson: {
        type: "string",
      }
    },
  };



  static relationMappings = { //Se define una relaccion llamada crucero
    crucero: {
      relation: Model.BelongsToOneRelation, //Una compra pertenece a una crucero
      modelClass: Crucero,
      join: { //Especifica los detalles de la relación
        from: "compra.cruceroId",
        to: "crucero.id",
      },
    },
  };

}

