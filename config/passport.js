const {authSecret} = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const {Strategy, ExtractJwt} = passportJwt

module.exports = app => {
    const params ={
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    }
    const strategy = new Strategy(params, (payload, done) => {
        app.db('user')
            .where({cpf: payload.cpf})
            .first()
            .then(user => {
                if(user) {
                    done(null,{cpf: user.cpf})
                } else {
                    done(null, false)
                }
            })
            .catch(err=> done(err, false))

    })
    passport.use(strategy)
    return {
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate('jwt', { session: false }),
    }
}