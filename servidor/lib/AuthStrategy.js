import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local' // Importamos la estrategia passport-local con el nombre "LocalStrategy"
import Cliente from '../models/cliente.model.js'
import Empresa from '../models/empresa.model.js';
import Administrador from '../models/administrador.model.js';

// Passport.use() aplica el middleware pasado por parámetros a la instancia de Passport
// (algo parecido a lo que hacemos con Express.use() para definir middlewares de Express)

export const strategyInit = passport => {
  passport.use('localCliente',
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  // Lógica a la que llegará Passport cuando haga el authenticate (login)
  (email, password, done) => {
    Cliente.query().findOne({email: email}).then(user => {
        if (!user) return done(null, false, {err: 'Usuario desconocido'}); // Si el usuario no existe, devolver callback con error
        user.verifyPassword(String(password), ((err, passwordIsCorrect) => { // Si existe, validar contraseña
          if (!!err) return done(err); // Si la validación contiene error, devolver callback con error
          if (!passwordIsCorrect) return done(null, false); // Si la contraseña no es válida, devolver callback sin usuario
          return done(null, user); // Si la contraseña es válida, devolver callback con usuario
        }))
      }).catch(function (err) {
        done(err) // Si se captura alguna excepción no controlada, devolver callback con error
      })
  }
));


// Serializar usuarios
passport.serializeUser((user, done) => {
  done(null, {
    email: user.email,
    role: user instanceof Cliente 
    ? 'cliente'
    : user instanceof Empresa
      ? 'empresa'
      : 'admin'
  })
})

// Deserializar usuarios
passport.deserializeUser((user, done) => {
  if (user.role === 'cliente') {
    Cliente.query().findById(user.email).then((found) => {
      done(null, found)
    })
  }
  else if (user.role === 'empresa') {
    Empresa.query().findById(user.email).then((found) => {
      done(null, found)
    })
  }
  else if (user.role === 'admin') {
    Administrador.query().findById(user.email).then((found) => {
      done(null, found)
    })
  } else {
    done(null, null);
  }
})
}

export default strategyInit;

