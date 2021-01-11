module.exports = app => {

    app.route('/segments')
        .all(app.config.passport.authenticate())
        .get(app.api.segments.get)
        .post(app.api.segments.save)

    app.route('/segments/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.segments.getID)
        .put(app.api.segments.update)
        .delete(app.api.segments.remove)
}