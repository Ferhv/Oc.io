import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local' 
import Administrador from '../models/administrador.model.js'



export const strategyInit3 = passport => {
  passport.use('localAdmin',
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  // Lógica a la que llegará Passport cuando haga el authenticate (login)
  (email, password, done) => {
    Administrador.query().findOne({email: email}).then(user => {
        if (!user) return done(null, false, {err: 'Administrador desconocido'}); // Si el Administrador no existe, devolver callback con error
        user.verifyPassword(String(password), ((err, passwordIsCorrect) => { // Si existe, validar contraseña
          if (!!err) return done(err); // Si la validación contiene error, devolver callback con error
          if (!passwordIsCorrect) return done(null, false); // Si la contraseña no es válida, devolver callback sin Administrador
          return done(null, user); // Si la contraseña es válida, devolver callback con Administrador
        }))
      }).catch(function (err) {
        done(err) // Si se captura alguna excepción no controlada, devolver callback con error
      })
  }
));
}

export default strategyInit3;

