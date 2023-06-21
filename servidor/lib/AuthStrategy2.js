import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local' // Importamos la estrategia passport-local con el nombre "LocalStrategy"
import Empresa from '../models/empresa.model.js'

export const strategyInit2 = passport => {
  passport.use('localEmpresa',
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  // Lógica a la que llegará Passport cuando haga el authenticate (login)
  (email, password, done) => {
    Empresa.query().findOne({email: email}).then(user => {
        if (!user) return done(null, false, {err: 'Empresa desconocida'}); // Si la empresa no existe, devolver callback con error
        user.verifyPassword(String(password), ((err, passwordIsCorrect) => { // Si existe, validar contraseña
          if (!!err) return done(err); // Si la validación contiene error, devolver callback con error
          if (!passwordIsCorrect) return done(null, false); // Si la contraseña no es válida, devolver callback sin usuario
          return done(null, user); // Si la contraseña es válida, devolver callback con empresa
        }))
      }).catch(function (err) {
        done(err) // Si se captura alguna excepción no controlada, devolver callback con error
      })
  }
));


}

export default strategyInit2;