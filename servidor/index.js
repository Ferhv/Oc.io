import Concierto from './models/concierto.model.js';
import Empresa from './models/empresa.model.js';
import Administrador from './models/administrador.model.js';
import Cliente from './models/cliente.model.js';
import Knex from 'knex';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import moment from 'moment';
import passport from 'passport';
import { development } from './knexfile.js';
import { strategyInit } from './lib/AuthStrategy.js';

// Instanciamos Express y el middleware de JSON y CORS
const app = express();
app.use(express.json());
app.use(cors());


// TODO Conexiones a la base de datos
const dbConnection = Knex(development);
Administrador.knex(dbConnection);
Cliente.knex(dbConnection); 
Empresa.knex(dbConnection);
Concierto.knex(dbConnection);



// TODO Definimos el puerto 3000 como puerto de escucha y un mensaje de confirmación cuando el servidor esté levantado
app.listen(8080,() => {
    console.log(`Servidor escuchando en el puerto 8080`);
});

