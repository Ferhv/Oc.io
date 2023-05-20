import  Empresa  from './models/empresa.model.js';
import  Concierto  from './models/concierto.model.js';
import  Cliente  from './models/cliente.model.js';
import Administrador from './models/administrador.model.js';

import Knex from 'knex';
import express from 'express';
import cors from 'cors';
import moment from 'moment';
import { esTelefonoValido, esFechaValida, esValidoDNI, esValidoEmail, esValidoCIF } from './lib/validators.js';
import { development } from './knexfile.js';
import passport from 'passport';
import session from 'express-session';
import strategyInit from './lib/AuthStrategy.js';
import strategyInit2 from './lib/AuthStrategy2.js';
//import strategyInit3 from './lib/AuthStrategy3,js';

// Instanciamos Express y el middleware de JSON y CORS -
const app = express();
app.use(express.json());
app.use(cors());

// Conexiones a la base de datos
const dbConnection = Knex(development);
Empresa.knex(dbConnection);
Concierto.knex(dbConnection); 
Cliente.knex(dbConnection);
Administrador.knex(dbConnection);


// * ========================================================================================================================================= 
// * ====================================================================  PASSPORT ==========================================================
// * ========================================================================================================================================= 

// TODO Inicialización del passport CLIENTE ===================================================================================================
app.use(session({
    secret: 'cines-session-cookie-key', // Secreto de la sesión (puede ser cualquier identificador unívoco de la app, no es público al usuario)
    name: 'SessionCookie.SID', // Nombre de la sesión
    resave: true,
    saveUninitialized: false,
}));
app.use(passport.initialize()); // passport.initialize() inicializa Passport
app.use(passport.session()); // passport.session() indica a Passport que usará sesiones
strategyInit(passport);


// TODO Inicialización del passport EMPRESA ================================================================================================
app.use(session({
  secret: 'cines-session-cookie-key', 
  name: 'SessionCookie.SID', 
  saveUninitialized: false,
}));
app.use(passport.initialize()); 
app.use(passport.session()); 
strategyInit2(passport);


// TODO Inicialización del passport ADMIN ================================================================================================
/*ssapp.use(session({
  secret: 'cines-session-cookie-key', 
  name: 'SessionCookie.SID', 
  resave: true,
  saveUninitialized: false,
}));
app.use(passport.initialize()); 
app.use(passport.session()); 
strategyInit3(passport);*/


//! REVISAR ********************************************
/*
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

                /
                **? results.filter(elem => {
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


});*/


// --- TUTORIA --- 
// * ========================================================================================================================================= 
// * =======================================================================  LOGIN ==========================================================
// * ========================================================================================================================================= 

// TODO Endpoint: POST /LOGIN  CLIENTE ================================================================================================
app.post('/login', passport.authenticate('localCliente'), (req, res) => {
    if (!!req.user) res.status(200).json(req.user) 
    else res.status(500).json({status: "error"})
});

// TODO Endpoint: POST /LOGIN EMPRESA ================================================================================================
app.post('/loginEmpresa', passport.authenticate('localEmpresa'), (req, res) => {
  if (!!req.user) res.status(200).json(req.user) 
  else res.status(500).json({status: "error"})
});

// TODO Endpoint: POST /LOGIN  ADMIN ================================================================================================
app.post('/loginAdmin', passport.authenticate('localAdmin'), (req, res) => {
  if (!!req.user) res.status(200).json(req.user) 
  else res.status(500).json({status: "error"})
});



// * ========================================================================================================================================= 
// * =======================================================================  CLIENTE ======================================================== 
// * ========================================================================================================================================= 

// TODO Endpoint: POST /REGISTRAR CLIENTE --> Ok  ============================================================================================
app.post('/registrarCliente', async (req, res) => {
    const { nombre, email, password, dni, fecha, telefono } = req.body;
  
    //^ Validar que se proporcionen todos los campos requeridos
    if (!nombre || !email || !password || !dni || !fecha || !telefono) {
      return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
    }
  
    //^Validar el formato del email
    if (!esValidoEmail(email)) {
      return res.status(400).json({ mensaje: 'Formato de email inválido' });
    }
  
    //^ Validar el formato del DNI
    if (!esValidoDNI(dni)) {
      return res.status(400).json({ mensaje: 'Formato de DNI inválido' });
    }
  
    //^ Validar el formato de la fecha de nacimiento
    if (!esFechaValida(fecha)) {
      return res.status(400).json({ mensaje: 'Formato de fecha inválido' });
    }
  
    //^ Validar el formato del número de teléfono
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
  

// TODO Endpoint: POST /BORRAR CLIENTE --> Ok ========================================================================================
app.post('/borrarCliente', async (req, res) => {
const clienteId = req.body.id;
Cliente.query().deleteById(clienteId).then(results => res.status(200).json({status: "OK"})).catch(err => res.status(500).json({error: err}));
});




// * ========================================================================================================================================= 
// * =======================================================================  EMPRESA ========================================================  
// * ========================================================================================================================================= 

// TODO Endpoint: POST /REGISTRAR EMPRESA --> Ok  ============================================================================================
app.post('/registrarEmpresa', async (req, res) => {
  const { nombre, email, password, cif, domicilio_social, telefono, responsable, euros} = req.body;

  //^ Validar que se proporcionen todos los campos requeridos 
  if (!nombre || !email || !password || !cif || !domicilio_social || !telefono || !responsable || !euros) {
    return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
  }

  //^Validar el formato del email
  if (!esValidoEmail(email)) {
    return res.status(400).json({ mensaje: 'Formato de email inválido' });
  }

  //^ Validar el formato del CIF
  if (!esValidoCIF(cif)) {
    return res.status(400).json({ mensaje: 'Formato de CIF inválido' });
  }

  //^ Validar el formato del número de teléfono
  if (!esTelefonoValido(telefono)) {
    return res.status(400).json({ mensaje: 'Formato de número de teléfono inválido' });
  }
  
  //^ Guardar los datos de la empresa en la base de datos 
  Empresa.query().insert({
  nombre,
  email,
  unsecurePassword: password,
  cif,
  domicilio_social,
  telefono: Number(telefono),
  responsable,
  euros: Number(euros)
  }).then(results => res.status(200).json({status: "Ok"})).catch(err => res.status(500).json({error: err}));
});


// TODO Endpoint: POST /BORRAR EMPRESA --> Ok ========================================================================================
app.post('/borrarEmpresa', async (req, res) => {
  const empresaId = req.body.id;
  Empresa.query().deleteById(empresaId).then(results => res.status(200).json({status: "OK"})).catch(err => res.status(500).json({error: err}));
  });


// TODO Endpoint: GET /LISTADO CONCIERTOS POR EMPRESA --> Ok ===============================================================================
app.get('/conciertosPorEmpresa', async (req, res) => {
  const empresaEmail = req.query.email;

  try {
    // Obtener los conciertos que coincidan con el email de la empresa
    const conciertos = await Concierto.query().where('empresa_email', empresaEmail);

    res.status(200).json(conciertos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los conciertos por empresa' });
  }
});

    


// * ========================================================================================================================================= 
// * =====================================================================  CONCIERTO ========================================================  
// * ========================================================================================================================================= 

// TODO Endpoint: POST /REGISTRAR CONCIERTO --> Ok  ============================================================================================
app.post('/registrarConcierto', async (req, res) => {
  const { nombre_evento, nombre_artista, ubicacion, aforo, descripcion, fecha, precio, empresa_email } = req.body;

  //^ Validar que se proporcionen todos los campos requeridos 
  if (!nombre_evento || !nombre_artista || !ubicacion || !aforo || !descripcion || !fecha || !precio || !empresa_email ) {
    return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
  }

  //^ Guardar los datos del concierto en la base de datos 
  Concierto.query().insert({
   nombre_evento,
    nombre_artista,
    ubicacion,
    aforo: Number(aforo),
    precio: Number(precio),
    descripcion,
    fecha,
    empresa_email
  }).then(results => res.status(200).json({status: "Ok"})).catch(err => res.status(500).json({error: err}));
});


// TODO Endpoint: POST /BORRAR CONCIERTO --> Ok ========================================================================================
app.post('/borrarConcierto', async (req, res) => {
  const conciertoId = req.body.id;
  Concierto.query().deleteById(conciertoId).then(results => res.status(200).json({status: "OK"})).catch(err => res.status(500).json({error: err}));
  });

  
// * ========================================================================================================================================= 
// * =====================================================================  ADMINISTRADOR ====================================================  
// * ========================================================================================================================================= 

// TODO Endpoint: POST /REGISTRAR ADMIN --> Ok  ============================================================================================
/*app.post('/registrarAdmin', async (req, res) => {
  const { email, password} = req.body;

  //^ Validar que se proporcionen todos los campos requeridos
  if (!email || !password) {
    return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
  }

  //^Validar el formato del email
  if (!esValidoEmail(email)) {
    return res.status(400).json({ mensaje: 'Formato de email inválido' });
  }

  //^ Guardar los datos del cliente en la base de datos
  Administrador.query().insert({
  email,
  unsecurePassword: password
  }).then(results => res.status(200).json({status: "Ok"})).catch(err => res.status(500).json({error: err}));
});*/

// TODO Endpoint: GET /LISTADO EMPRESAS NO VERIFICADAS ============================================
app.get('/empresasNoVerificadas', async (req, res) => {
  try {
    // Obtener todas las empresas no verificadas de la base de datos
    const empresasNoVerificadas = await Empresa.query().where('verificado', false);

    res.status(200).json(empresasNoVerificadas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las empresas no verificadas' });
  }
});

// TODO Endpoint: GET /LISTADO EMPRESAS  ============================================
app.get('/empresasLista', async (req, res) => {
  try {
    // Obtener todas las empresas de la base de datos
    const empresas = await Empresa.query();

    res.status(200).json(empresas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las empresas' });
  }
});


// ! Endpoint: GET / AUTORIZAR UNA EMPRESA =========================================
app.post('/verificarEmpresa', async (req, res) => {
  const empresaId = req.body.id;
  
  try {
    await Empresa.query().findOne({ email: empresaId }).patch({ verificado: true });
    res.status(200).json({ status: 'OK' });
  } catch (error) {
    res.status(500).json({ error: 'Error al marcar la empresa como verificada' });
  }
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
  

  
  

//^ Definimos el puerto 8080 
app.listen(8080,() => {
    console.log(`Servidor escuchando en el puerto 8080`);
});



