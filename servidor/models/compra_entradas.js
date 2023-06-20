import { Model } from "objection";
import express from 'express';

/** 
// Conexiones a la base de datos
const dbConnection = Knex(development);
Concierto.knex(dbConnection);

// Configurar el middleware para procesar JSON
app.use(express.json());




// TODO Ruta para obtener la información de los cruceros ===================================================================================

// Ruta para comprar una entrada **/
app.post('/comprar_entradas', async (req, res) => {
  // Aquí puedes realizar la lógica para procesar la compra de la entrada
  // Puedes acceder a los datos enviados en el cuerpo de la solicitud utilizando req.body

  
  try {
    // Realizar la solicitud al servicio externo para procesar el pago
    const respuestaPago = await axios.post('https://pse-payments-api.ecodium.dev/payment', req.body);

    // Verificar la respuesta del servicio de pago
    if (respuestaPago.data.status === 'success') {
      // Pago exitoso, realizar las operaciones necesarias
      // (almacenar los datos de la entrada, generar un boleto, etc.)
      const { nombre, email, password, dni, fecha, telefono } = req.body;

      const respuesta = {
        mensaje: 'Entrada comprada exitosamente',
        entrada: req.body,
      };

      res.json(respuesta);
    } else {
      // Pago fallido, manejar el caso de error
      const respuesta = {
        mensaje: 'Error al procesar el pago',
        error: respuestaPago.data.error,
      };

      res.status(400).json(respuesta);
    }
  } catch (error) {
    // Error al realizar la solicitud al servicio de pago
    const respuesta = {
      mensaje: 'Error al procesar el pago',
      error: error.message,
    };

    res.status(500).json(respuesta);
  }
});

/* 
  // Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
  });
  */