
app.post('/registrar-empresa', (req, res) => {
    const empresa = {
      nombre: req.body.nombre,
      email: req.body.email,
      contrasena: req.body.contrasena,
      cif: req.body.cif,
      domicilio_social: req.body.domicilio_social,
      telefono: req.body.telefono,
      responsable: req.body.responsable,
      euros: req.body.euros
    };
  
    //! Validar que se proporcionaron todos los campos obligatorios
    if (!empresa.nombre || !empresa.email || !empresa.contrasena || !empresa.cif || !empresa.domicilio || !empresa.telefono || !empresa.domicilio_social || !empresa.euros) {
      return res.status(400).send('Por favor complete todos los campos obligatorios');
    }
  
    // Guardar la información de la empresa en pgadmin4
    db.collection('empresas').insertOne(empresa, (err, result) => {
      if (err) {
        return res.status(500).send('Ocurrió un error al guardar la información de la empresa');
      }
      return res.send('La empresa se registró correctamente');
    });
  });
  