module.exports = app => {

    app.route('/status')
        .all(app.config.passport.authenticate())
        .get(app.api.status.get)
        .post(app.api.status.save)

    app.route('/status/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.status.getID)
        .put(app.api.status.update)
        .delete(app.api.status.remove)
}