








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


// Borrar cuenta

// Comprar entradas

// Pagar entrada