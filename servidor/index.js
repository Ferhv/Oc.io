import  Empresa  from './models/empresa.model.js';
import  Concierto  from './models/concierto.model.js';
import  ShowTiming  from './models/show_timing.model.js';
import  Cliente  from './models/cliente.model.js';

import Knex from 'knex';
import express from 'express';
import cors from 'cors';
import moment from 'moment';

import { development } from './knexfile.js';

// Instanciamos Express y el middleware de JSON y CORS -
const app = express();
app.use(express.json());
app.use(cors());

// Conexiones a la base de datos
const dbConnection = Knex(development);
Empresa.knex(dbConnection);
Concierto.knex(dbConnection); 
ShowTiming.knex(dbConnection);
Cliente.knex(dbConnection);
Administrador.knex(dbConnection);


// TODO Endpoint: POST /concierto --> Devuelve todas los conciertos ====================================================================
//La función se ejecuta cuando se realiza una solicitud POST a esa ruta en el servidor
app.post('/concierto', (req, res) => {

    // La consulta se define como una instancia del modelo "Concierto" y se llama "consulta"
    //Método "throwIfNotFound()" para garantizar que se produzca un error si no se encuentra ningun concierto en la base de datos
    const consulta = Concierto.query().throwIfNotFound();
    if (!!req.body && req.body !== {}) {

        //^ Filtrado por ID
        //Se verifica si el cuerpo de la solicitud no está vacío y si contiene algún valor
        //Si contiene algún valor, la función comienza a aplicar filtros a la consulta.
        if (!!req.body.id) consulta.findById(req.body.id);

        //^ Filtrado por fechas
        if (!!req.body.sessionBefore || !!req.body.sessionAfter) {
            consulta.withGraphJoined('sessions');
            if (!!req.body.sessionBefore) consulta.where('sessions.day', '<=', req.body.sessionBefore);
            if (!!req.body.sessionAfter) consulta.where('sessions.day', '>=', req.body.sessionAfter);
        }

        consulta.then(async results => {
            const finalObject = !!req.body.artistasArray 

                ///^ Filtrado por artista
                ? results.filter(elem => {
                    const artistasArray = elem.artistas.split(',');
                    return artistasArray.every(artista => req.body.artistas.includes(artista))
                }) 
                : results;
            if (!!req.body.sessionBefore || !!req.body.sessionAfter) {

                //^ Formateo de cartelera
                //Devuelve una lista de objetos de película que cumplen con ciertos criterios de filtro

                //La variable "formattedObject" es un objeto que se construye a partir de los resultados de la consulta 
                //Este objeto se construye utilizando el método "map()" que itera sobre cada elemento del array "finalObject" 
                //y devuelve un nuevo array con los elementos formateados según los requisitos de la función.
                const formattedObject = await Promise.all(finalObject.map(async elem => {
                    return {
                        ...elem,
                        sessions: await Promise.all(elem.sessions.map(async session => {
                            const empresaInfo = await Concierto.query().findById(session.empresa_id);
                            const timingInfo = await Timeslot.query().findById(session.timing_id);
                            return {
                                empresa: empresaInfo.name,
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
    } else Concierto.query().then(results => res.status(200).json(results));


});

// TODO Endpoint: POST /empresas --> Devuelve todas las empresas ====================================================================


//^ Definimos el puerto 3000 como puerto de escucha y un mensaje de confirmación cuando el servidor esté levantado
app.listen(3000,() => {
    console.log(`Servidor escuchando en el puerto 3000`);
});



