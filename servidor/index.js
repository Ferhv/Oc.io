import  Empresa  from './models/empresa.model.js';
import  Crucero  from './models/crucero.model.js';
import  Cliente  from './models/cliente.model.js';
import  Compra  from './models/compra.model.js';
import Administrador from './models/administrador.model.js';

import Knex from 'knex';
import express from 'express';
import cors from 'cors';
import moment from 'moment';
import { esTelefonoValido, esFechaValida, esValidoDNI, esValidoEmail, esValidoCIF, esValidoCVV, esValidoCard, esValidoExpiracion } from './lib/validators.js';
import { development } from './knexfile.js';
import passport from 'passport';
import session from 'express-session';
import strategyInit from './lib/AuthStrategy.js';
import strategyInit2 from './lib/AuthStrategy2.js';
import strategyInit3 from './lib/AuthStrategy3.js';

// Instanciamos Express y el middleware de JSON y CORS -
const app = express();
app.use(express.json());
app.use(cors());

// Conexiones a la base de datos
const dbConnection = Knex(development);
Empresa.knex(dbConnection);
Crucero.knex(dbConnection); 
Cliente.knex(dbConnection);
Compra.knex(dbConnection);
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
app.use(session({
  secret: 'cines-session-cookie-key', 
  name: 'SessionCookie.SID', 
  saveUninitialized: false,
}));
app.use(passport.initialize()); 
app.use(passport.session()); 
strategyInit3(passport);


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
// * =======================================================================  EMPRESA- NAVIERA ========================================================  
// * ========================================================================================================================================= 

// TODO Endpoint: POST /REGISTRAR EMPRESA --> Ok  ============================================================================================
app.post('/registrarEmpresa', async (req, res) => {
  const { nombre, email, password, cif, puerto, telefono, responsable, euros} = req.body;

  //^ Validar que se proporcionen todos los campos requeridos 
  if (!nombre || !email || !password || !cif || !puerto  || !telefono || !responsable || !euros) {
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
  puerto,
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


// TODO Endpoint: GET /LISTADO CRUCEROS POR EMPRESA --> Ok ===============================================================================
app.get('/crucerosPorEmpresa', async (req, res) => {

const emailEmpresa = req.query.id;

try {
  // Obtener los cruceros que coinciden con el email de la empresa
  const cruceros = await Crucero.query()
    .where('empresa_email', emailEmpresa)

  res.status(200).json(cruceros);
} catch (error) {
  res.status(500).json({ error: 'Error al obtener los cruceros por empresa' });
}
});

// ! BORRADOR Endpoint: PUT ==================================================================================================================
app.put('/cruceros/:idCrucero', async (req, res) => {
  const idCrucero = req.params.idCrucero;
  const nuevosDatosCrucero = req.body;
  
  try {
    
    // Actualizar el crucero por su ID
    // Patch -> para actualizar los campos del crucero en la base de datos
    await Crucero.query().findById(idCrucero).patch(nuevosDatosCrucero);
    
    res.status(200).json({ status: 'OK' });
    
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la informacion del Crucero' });
  }
});
debugger;

// ! BORRADOR ===============================================================================
/*app.delete('/eventos/:idEvento', async (req, res) => {
  const idEvento = req.params.id;
  
  try {
    // Eliminar el evento por su ID
    await Concierto.query().deleteById(idEvento);
    
    res.status(200).json({ status: 'OK' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el evento' });
  }
});*/


// ! BORRADOR ===============================================================================
app.get('/pantallaPrincipal', async (req, res) => {
  const idEmpresa = req.params.id;
  try {
    // Obtener el estado de verificación de la empresa por su ID
    const empresa = await Empresa.query().findById(idEmpresa);

    if (!empresa) {
      return res.status(404).json({ error: 'Empresa no encontrada' });
    }

    let mensaje = ''; // Mensaje por defecto
    if (!empresa.verificado) {
      // Si la empresa no está verificada, asignar el mensaje de cuenta temporal
      mensaje = 'Su cuenta es temporal y está pendiente de verificación por parte del administrador.';
    }

    res.render('pantallaPrincipal', { mensaje });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el estado de verificación de la empresa' });
  }
});


// * ========================================================================================================================================= 
// * =====================================================================  CRUCERO ========================================================  
// * ========================================================================================================================================= 

// TODO Endpoint: POST /REGISTRAR CRUCERO --> Ok  ============================================================================================
app.post('/registrarCrucero', async (req, res) => {
  const { nombre, puerto, ubicacion, aforo, descripcion, fecha, hora, precio, empresa_email } = req.body;

  //^ Validar que se proporcionen todos los campos requeridos 
  if (!nombre || !puerto || !ubicacion || !aforo || !descripcion || !fecha || !hora || !precio || !empresa_email ) {
    return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
  }

  //^ Guardar los datos del crucero en la base de datos 
  Crucero.query().insert({
    nombre,
    puerto,
    ubicacion,
    aforo: Number(aforo),
    precio: Number(precio),
    descripcion,
    fecha,
    hora,
    empresa_email
  }).then(results => res.status(200).json({status: "Ok"})).catch(err => res.status(500).json({error: err}));
});


// TODO Endpoint: POST /BORRAR CRUCERO --> Ok ========================================================================================
app.post('/borrarCrucero', async (req, res) => {
  const cruceroId = req.body.id;
  Crucero.query().deleteById(cruceroId).then(results => res.status(200).json({status: "OK"})).catch(err => res.status(500).json({error: err}));
  });


// TODO  Endpoint: GET / LISTADO CRUCEROS QUE NO HAYAN PASADO DE FECHA =====================================================================
app.get('/crucerosDisponibles', async (req, res) => {
  try {
    // Obtener los eventos disponibles (que no hayan pasado)
    const eventos = await Crucero.query().where('fecha', '>', new Date());

    res.status(200).json(eventos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los eventos disponibles' });
  }
});


// ! BORRADOR =======================================================================================
/*app.get('/detallesEvento', async (req, res) => {
  const idEvento = req.params.id; 

  try {
    // Obtener los detalles del evento por su ID
    const concierto = await Concierto.query().findById(idEvento); 

    if (!concierto) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    // Comprobar si la empresa está verificada
    const empresa = await Empresa.query().findById(concierto.empresa_email); 

    let mensajeEmpresaNoVerificada = '';
    if (empresa && !empresa.verificado) {
      mensajeEmpresaNoVerificada = 'Esta empresa no está verificada.';
    }

    res.status(200).json({ concierto, mensajeEmpresaNoVerificada });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los detalles del concierto' });
  }
});*/



// * ========================================================================================================================================= 
// * =======================================================================  COMPRA =========================================================  
// * ========================================================================================================================================= 

// ! BORRADOR =======================================================================================
//! Función para cifrar datos
/*const crypto = require('crypto');
const encryptData = (data) => {
  try {
    const buffer = Buffer.from(data);
    const encryptedData = crypto.publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      buffer
    );
    return encryptedData.toString('base64');
  } catch (error) {
    throw new Error('Error al cifrar los datos');
  }
};*/


//! Función para descifrar datos
/*const decryptData = (encryptedData) => {
  try {
    const buffer = Buffer.from(encryptedData, 'base64');
    const decryptedData = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      buffer
    );
    return decryptedData.toString();
  } catch (error) {
    throw new Error('Error al descifrar los datos');
  }
};*/

// ! BORRADOR =======================================================================================
//! Endpoint para comprar billetes
app.post('/comprarBilletes', async (req, res) => {
  const { cruceroId, cantidadBilletes, datosTarjeta } = req.body;

  // Validar que se proporcionen todos los campos requeridos
  if (!cruceroId || !cantidadBilletes || !datosTarjeta) {
    return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
  }

  try {
    //^ Realizar verificaciones para el número de tarjeta, CVV y fecha de expiración
    if (!esValidoCard(datosTarjeta.cardNumber)) {
      return res.status(400).json({ mensaje: 'Número de tarjeta inválido' });
    }

    if (!esValidoCVV(datosTarjeta.cvv)) {
      return res.status(400).json({ mensaje: 'CVV inválido' });
    }

    if (!esValidoExpiracion(datosTarjeta.expiresOn)) {
      return res.status(400).json({ mensaje: 'Fecha de expiración inválida' });
    }

    //^ Verificar la disponibilidad de billetes para el crucero
    const crucero = await Crucero.query().findById(cruceroId);
    if (!crucero) {
      return res.status(400).json({ mensaje: 'El crucero no existe' });
    }

    if (crucero.aforo < cantidadBilletes) {
      return res.status(400).json({ mensaje: 'No hay suficientes billetes disponibles' });
    }

    // Realizar el proceso de compra de billetes
    crucero.aforo -= cantidadBilletes;
    await crucero.$query().patch();

    // Crear la estructura de datos deseada
    const misDatos = {
      cruceroId: parseInt(cruceroId),
      cantidadBilletes: parseInt(cantidadBilletes),
      datosTarjeta: {
        cardNumber: datosTarjeta.cardNumber,
        cvv: datosTarjeta.cvv,
        expiresOn: datosTarjeta.expiresOn
      }
    };

    // Convertir a JSON y luego a base64
    const miString = JSON.stringify(misDatos);
    const secure = Buffer.from(miString).toString('base64');

    console.log(secure);

    // Guardar la información de la compra en la base de datos
    const compra = {
      cruceroId,
      cantidadBilletes,
      datosTarjeta: datosTarjetaCifrados,
    };

    await Compra.query().insert(compra);

    // Enviar una respuesta exitosa al cliente
    res.status(200).json({ mensaje: 'Billetes comprados exitosamente' });
  } catch (error) {
    // Manejar cualquier error que ocurra durante el proceso de compra
    console.log(error);
    res.status(500).json({ mensaje: 'Error al realizar la compra de los billetes' });
  }
});

//! ENDPOINT Mostrar informacion de compra ===============================================
//const qr = require('qrcode');
//const Compra = require('./models/compra.model.js');




// ! BORRADOR =======================================================================================
const express = require('express');
const crypto = require('crypto');

//const app = express();
app.use(express.json());

// Generar un par de claves pública y privada
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

  try {
    //^ Obtener la información de la compra desde la base de datos
    const comprab = await Compra.query().findById(compraId);

    if (!comprab) {
      return res.status(404).json({ mensaje: 'Compra no encontrada' });
    }

    // Obtener el nombre del crucero, la cantidad de billetes y los últimos 4 dígitos de la tarjeta
    const crucero = await Crucero.query().findById(comprab.cruceroId);

    if (!crucero) {
      return res.status(404).json({ mensaje: 'Crucero no encontrado' });
    }

    const nombreCrucero = crucero.nombre;
    const cantidadBilletes = comprab.cantidadBilletes;
    const numeroTarjeta = comprab.datosTarjeta.cardNumber;
    const ultimosDigitosTarjeta = numeroTarjeta.slice(-4);
    const asteriscosTarjeta = '*'.repeat(numeroTarjeta.length - 4);

    //^ Generar el código QR con la información de la comprab
    /*const qrData = {
      nombreCrucero,
      cantidadBilletes,
      numeroTarjeta: `${asteriscosTarjeta}${ultimosDigitosTarjeta}`,
      compraId
    };*/

    //const qrCode = await qr.toDataURL(JSON.stringify(qrData));

    // Devolver la información de la comprab y el código QR al cliente
  res.status(200).json({ nombreCrucero, cantidadBilletes, numeroTarjeta: `${asteriscosTarjeta}${ultimosDigitosTarjeta}`/*, qrCode*/ });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error al obtener la información de la comprab' });
  }
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


// TODO Endpoint: GET / AUTORIZAR UNA EMPRESA =========================================
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

