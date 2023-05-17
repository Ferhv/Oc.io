import  Empresa  from './models/empresa.model.js';
import  Concierto  from './models/concierto.model.js';
import  Cliente  from './models/cliente.model.js';
import Administrador from './models/administrador.model.js';
import Knex from 'knex';
import express from 'express';
import cors from 'cors';
import moment from 'moment';
import { esTelefonoValido, esFechaValida, esValidoDNI, esValidoEmail } from './lib/validators.js';
import { development } from './knexfile.js';
import passport from 'passport';
import session from 'express-session';
import strategyInit from './lib/AuthStrategy.js';

// Instanciamos Express y el middleware de JSON y CORS -
const app = express();
app.use(express.json());
app.use(cors());

// Conexiones a la base de datos
const dbConnection = Knex(development);
Empresa.knex(dbConnection);
Concierto.knex(dbConnection); 
//ShowTiming.knex(dbConnection);
Cliente.knex(dbConnection);
Administrador.knex(dbConnection);

// Inicialización del passport
app.use(session({
    secret: 'cines-session-cookie-key', // Secreto de la sesión (puede ser cualquier identificador unívoco de la app, esto no es público al usuario)
    name: 'SessionCookie.SID', // Nombre de la sesión
    resave: true,
    saveUninitialized: false,
}));
app.use(passport.initialize()); // passport.initialize() inicializa Passport
app.use(passport.session()); // passport.session() indica a Passport que usará sesiones
strategyInit(passport);


// TODO Endpoint: POST /concierto --> Devuelve todas los conciertos ====================================================================
//La función se ejecuta cuando se realiza una solicitud POST a esa ruta en el servidor
app.post('/concierto', (req, res) => {

    // La consulta se define como una instancia del modelo "Concierto" y se llama "consulta"
    //Método "throwIfNotFound()" para garantizar que se produzca un error si no se encuentra ningun concierto en la base de datos
    const consulta = Concierto.query();
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
    } else consulta.then(results => res.status(200).json(results));


});

// TODO Endpoint: POST /empresas --> Devuelve todas las empresas ====================================================================

// --- TUTORIA --- 

// Login
app.post('/login', passport.authenticate('localCliente'), (req, res) => {
    if (!!req.user) res.status(200).json(req.user) 
    else res.status(500).json({status: "error"})
});

// Registrar cliente --> OK
app.post('/registrar', async (req, res) => {
    const { nombre, email, password, dni, fecha, telefono } = req.body;
  
    //^ Validar que se proporcionen todos los campos requeridos
    if (!nombre || !email || !password || !dni || !fecha || !telefono) {
      return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
    }
  
    //^Validar el formato del email
    if (!esValidoEmail(email)) {
      return res.status(400).json({ mensaje: 'Formato de email inválido' });
    }
  
    // Validar el formato del DNI
    if (!esValidoDNI(dni)) {
      return res.status(400).json({ mensaje: 'Formato de DNI inválido' });
    }
  
    // Validar el formato de la fecha de nacimiento
    if (!esFechaValida(fecha)) {
      return res.status(400).json({ mensaje: 'Formato de fecha inválido' });
    }
  
    // Validar el formato del número de teléfono
    if (!esTelefonoValido(telefono)) {
      return res.status(400).json({ mensaje: 'Formato de número de teléfono inválido' });
    }
    //^ Guardar los datos del cliente en la base de datos
    Cliente.query().insert({
    nombre,
    email,
    fecha,
    dni,
    telefono: Number(telefono),
    unsecurePassword: password
    }).then(results => res.status(200).json({status: "Ok"})).catch(err => res.status(500).json({error: err}));
  });
  
  // Borrar cliente --> OK
app.post('/borrarCliente', async (req, res) => {
const clienteId = req.body.id;
Cliente.query().deleteById(clienteId).then(results => res.status(200).json({status: "OK"})).catch(err => res.status(500).json({error: err}));
});

// Parámetros? 
  app.get('/eventos/:id', async (req, res) => {
    const eventoId = req.params.id;
  
    try {
        // Recuperar los detalles del evento de la base de datos     
        const evento = await Evento.query().findById(eventoId);
  
      //! verificar que el evento ha sido creado por una empresa verificada
  
      res.status(200).json(evento);
    } catch (error) {
      console.error('Error al obtener los detalles del evento:', error);
      res.status(500).json({ mensaje: 'Error al obtener los detalles del evento' });
    }
  });
  

  
  

//^ Definimos el puerto 3000 como puerto de escucha y un mensaje de confirmación cuando el servidor esté levantado
app.listen(8080,() => {
    console.log(`Servidor escuchando en el puerto 8080`);
});



