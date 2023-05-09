import {Model} from 'objection';
import Timeslot from './Timeslot.model.js';
import concierto  from './concierto.models.js';
import Movie from './Movie.model.js';
import Empresa from './empresa.model.js';

export default class ShowTiming extends Model {
    static tableName = 'show_timing';
    static idColumn = 'id';
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

    static relationMappings = () => ({
        promotoras: {
            relation: Model.BelongsToOneRelation,
            modelClass: Empresa,
            join: {
                from: 'show_timing.empresa_id',
                to: 'empresa.id'
            }
        },
        concierto: {
            relation: Model.BelongsToOneRelation,
            modelClass: concierto,
            join: {
                from: 'show_timing.concierto_id',
                to: 'concierto.id'
            }
        },
        // Relación TIMETABLE: Para cada show_timing, devuelve la hora de inicio y la hora de fin
        timetable: {
            relation: Model.BelongsToOneRelation,
            modelClass: Timeslot,
            filter: query => query.select('start_time', 'end_time'),
            join: {
                from: 'show_timing.timing_id',
                to: 'timeslot.id'
            }
        }
    });
}