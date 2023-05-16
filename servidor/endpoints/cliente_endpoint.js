import express from 'express';
import cors from 'cors';

import Administrador from './models/administrador.model.js';
import Cinema from './models/compra_entradas.js';
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


/**
 * ENDPOINT: POST /login --> Inicia sesión
 * 
 * Si os dais cuenta, declaramos el endpoint metiendo passport.authenticate('local') como middleware 
 * y después ya la lógica (que ocurrirá después del authenticate)
 * 
 * Para más info del authenticate ver el archivo LocalStrategy.js
 */
app.post('/login', passport.authenticate('local'), (req, res) => {
    if (!!req.user) res.status(200).json(req.user) 
    else res.status(500).json({error: "Credenciales incorrectas"});
});

/**
 * ENDPOINT: POST /register --> Registra un usuario
 * 
 * Para registrar un usuario bastará con comprobar si existe y, si no existe, insertarlo en la base de datos.
 * Para ello, podemos reciclar la query inicial añadiendo el método "insert"
 * 
 * El método findOne de objection es el equivalente a .where('columna', '=', valor).first(), pero simplificado
 * Nota: Para poder llamar a findOne de este modo (recibiendo un JSON como parámetro), es preciso haber definido el JSONSchema en el modelo del Usuario
 */
app.post("/register", (req, res) => {
    const dbQuery = User.query();
    dbQuery.findOne({user: req.body.user}).then(async result => {
        if (!!result) res.status(500).json({error: "El usuario ya existe"});
        else {
            dbQuery.insert({
                user: req.body.user,
                unsecurePassword: String(req.body.password)
            }).then(insertResult => {
                if (!!insertResult) res.status(200).json({status: 'OK'})
                else res.status(500).json({status: 'Error'});
            }).catch(error => {
                res.status(500).json({status: 'error'});
            })
        }

    })
  });

// Endpoint: GET /user --> Devuelve info del usuario en la sesión actual (y un 401 si no se ha iniciado sesión)
app.get("/user", (req, res) => !!req.isAuthenticated() ? res.status(200).send(req.session) : res.status(401).send('Sesión no iniciada!'));


/**
 * ENDPOINT: POST /delete --> Eliminar un usuario
 * 
 * Para registrar un usuario bastará con comprobar si existe y, si no existe, insertarlo en la base de datos.
 * Para ello, podemos reciclar la query inicial añadiendo el método "insert"
 * 
 * El método findOne de objection es el equivalente a .where('columna', '=', valor).first(), pero simplificado
 * Nota: Para poder llamar a findOne de este modo (recibiendo un JSON como parámetro), es preciso haber definido el JSONSchema en el modelo del Usuario
 */
app.post("/delete", (req, res) => {
    const dbQuery = User.query();
    dbQuery.findOne({user: req.body.user}).then(async result => {
        if (!!result) res.status(500).json({error: "El usuario no se ha encontrado"});
        else {
            dbQuery.delete({
                user: req.body.user,
                unsecurePassword: String(req.body.password)
            }).then(insertResult => {
                if (!!insertResult) res.status(200).json({status: 'OK'})
                else res.status(500).json({status: 'Error'});
            }).catch(error => {
                res.status(500).json({status: 'error'});
            })
        }

    })
  });

// Comprar entradas

// Pagar entrada