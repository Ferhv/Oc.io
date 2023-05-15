import { Model } from "objection";
import express from 'express';

// Conexiones a la base de datos
const dbConnection = Knex(development);
Concierto.knex(dbConnection);

// Configurar el middleware para procesar JSON
app.use(express.json());




// TODO Ruta para obtener la información de los conciertos  ===================================================================================
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
  
  // TODO Ruta para comprar entradas  ===========================================================================================================
  app.post('/concierto/:id/comprar', async (req, res) => {
    const eventoId = req.params.id;
    const { cantidad, tarjeta } = req.body;
  
    try {
      // Validar la disponibilidad de la entrada
      const evento = await Concierto.query().findById(eventoId);
  
      if (!evento) {
        return res.status(404).json({ mensaje: 'El evento no existe' });
      }
  
      if (evento.fecha < new Date()) {
        return res.status(400).json({ mensaje: 'El evento ya ha pasado' });
      }
  
      if (cantidad > evento.aforo) {
        return res.status(400).json({ mensaje: 'No hay suficientes entradas disponibles' });
      }
  
      //  Realizar el proceso de compra de la entrada
      const total = evento.precio * cantidad;
  
      //! Conectarse al servicio de pasarela de pago y validar la transacción
      //! Guardar la informacion
    
      res.status(200).json({ mensaje: 'Compra de entrada realizada exitosamente' });
    } catch (error) {
      console.error('Error al comprar la entrada:', error);
      res.status(500).json({ mensaje: 'Error al comprar la entrada' });
    }
  });
  
  


  // Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
  });
  