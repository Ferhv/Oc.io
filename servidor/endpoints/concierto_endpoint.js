import express from 'express';
import cors from 'cors';

import Administrador from './models/administrador.model.js';
import Cliente from './models/cliente.model.js';
import Concierto from './models/concierto.model.js';
import Empresa from './models/empresa.model.js';

import Knex from 'knex';
import { development } from './knexfile.js';
import session from 'express-session';
import moment from 'moment';
import passport from 'passport';
import { strategyInit } from './lib/AuthStrategy.js';
import Cliente from '../models/cliente.model.js';

// Instanciamos Express y el middleware de JSON y CORS
const app = express();
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// Inicialización del sistema de sesiones (adelantando temario del siguiente lab)
app.use(session({
    secret: 'cines-session-cookie-key', // Secreto de la sesión (puede ser cualquier identificador unívoco de la app, esto no es público al usuario)
    name: 'SessionCookie.SID', // Nombre de la sesión
    resave: true,
    saveUninitialized: false,
}));
app.use(passport.initialize()); // passport.initialize() inicializa Passport
app.use(passport.session()); // passport.session() indica a Passport que usará sesiones
strategyInit(passport);

// Conexiones a la base de datos
const dbConnection = Knex(development);
Administrador.knex(dbConnection);
Cliente.knex(dbConnection); 
Concierto.knex(dbConnection);
Empresa.knex(dbConnection);





// Endpoint: 
// Endpoint: POST /movies --> Devuelve todos los conciertos
app.post('/movies', (req, res) => {
    const consulta = Movie.query().throwIfNotFound();
    if (!!req.body && req.body !== {}) {

        // Filtrado por ID
        if (!!req.body.id) consulta.findById(req.body.id);

        // Filtrado por fechas
        if (!!req.body.sessionBefore || !!req.body.sessionAfter) {
            consulta.withGraphJoined('sessions');
            if (!!req.body.sessionBefore) consulta.where('sessions.day', '<=', req.body.sessionBefore);
            if (!!req.body.sessionAfter) consulta.where('sessions.day', '>=', req.body.sessionAfter);
        }

        consulta.then(async results => {
            const finalObject = !!req.body.actors 
                // Filtrado por reparto
                ? results.filter(elem => {
                    const actorsArray = elem.actors.split(',');
                    return actorsArray.every(actor => req.body.actors.includes(actor))
                }) 
                : results;
            if (!!req.body.sessionBefore || !!req.body.sessionAfter) {
                // Formateo de cartelera
                const formattedObject = await Promise.all(finalObject.map(async elem => {
                    return {
                        ...elem,
                        sessions: await Promise.all(elem.sessions.map(async session => {
                            const theaterInfo = await Cinema.query().findById(session.theater_id);
                            const timingInfo = await Timeslot.query().findById(session.timing_id);
                            return {
                                cinema: theaterInfo.name,
                                day: moment(session.day).format('DD/MM/YYYY'),
                                start: timingInfo.start_time,
                                end: timingInfo.end_time,
                            }
                        }))
                    }
                }));
                res.status(200).json(formattedObject);
            } else res.status(200).json(finalObject);
            

        })
    } else consulta.then(results => res.status(200).json(results));


});


// Detalles concierto