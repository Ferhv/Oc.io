import {Model} from 'objection';
import Concierto  from './concierto.models.js';
import Empresa from './empresa.model.js';

export default class ShowTiming extends Model { //TODO  ========================================   SHOWTIMING  =============================
    
    static tableName = 'showtiming';
    
    // Clave primaria
    static idColumn = 'id';
    
    // Esquema de datos
    static jsonSchema = {
        type: 'object',
        properties: {
            id: {
                type: 'integer'
            },
            day: {
                type: 'date'
            },
            empresa_id: {
                type: 'integer'
            },
            concierto_id: {
                type: 'integer'
            },
            timing_id: {
                type: 'integer'
            }
        }
    };


    //relaccion pertenece a uno, entre modelo actual y el modelo "Empresa"
    static relationMappings = () => ({
        empresas: {
            relation: Model.BelongsToOneRelation,
            modelClass: Empresa,

            //La relación se establece a través de los campos "showtiming.empresa_id" y "empresa.id" 
            join: {
                from: 'showtiming.empresa_id',
                to: 'empresa.id'
            }
        },
        //Establece una relación de pertenencia entre los registros de la tabla actual y los registros de la tabla "Empresa", 
        //lo que significa que cada registro en la tabla actual pertenece a un registro en la tabla "Empresa".


        concierto: {
            relation: Model.BelongsToOneRelation,
            modelClass: Concierto,
            join: {
                from: 'showtiming.concierto_id',
                to: 'concierto.id'
            }
        },

         // Relación TIMETABLE: Para cada showtiming, devuelve la hora de inicio y la hora de fin
         timetable: {
            relation: Model.BelongsToOneRelation,
            modelClass: Timeslot,
            filter: query => query.select('start_time', 'end_time'),
            join: {
                from: 'showtiming.timing_id',
                to: 'timeslot.id'
            }
        }


    });
}

/**CREATE TABLE SHOWTIMING (
	id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
	day DATE not null, 
	empresa_id INTEGER not null, 
	concierto_id INTEGER not null, 
	timing_id INTEGER not null
); */

