import { Model } from "objection";
//import Movie from './Movie.model.js';
//import ShowTiming from './ShowTiming.model.js';
export default class Empresa extends Model {

  // Nombre de la tabla
  static tableName = "promotora"; //TODO PROMOTORA

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

  // TODO ===============================================================================================================
  /*static relationMappings = () => ({
    // Relación CARTELERA --> Para cada cine, devuelve la propiedad "catalog" con la cartelera de ese cine
    catalog: {
      relation: Model.ManyToManyRelation,
      modelClass: Movie,
      join: {
        from: "theater.id",
        through: {
          modelClass: ShowTiming,
          from: "show_timing.theater_id",
          to: "show_timing.movie_id",
        },
        to: "movie.id",
      },
    },
    sessions: {
      relation: Model.HasManyRelation,
      modelClass: ShowTiming,
      join: {
        from: "theater.id",
        to: "show_timing.theater_id",
      },
    },
  });*/
}
