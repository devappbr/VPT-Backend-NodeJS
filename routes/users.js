module.exports = app => {
    app.post('/signup', app.api.user.signup)
    app.post('/signin', app.api.auth.signin)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .get(app.api.user.get)

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.user.getID)
        .put(app.api.user.update)
        .delete(app.api.user.remove)
}