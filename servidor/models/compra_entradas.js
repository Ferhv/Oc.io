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
  

  


  // Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
  });
  