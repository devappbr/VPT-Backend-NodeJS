module.exports = app => {

    app.route('/categories')
        .all(app.config.passport.authenticate())
        .get(app.api.categories.get)
        .post(app.api.categories.save)

    app.route('/categories/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.categories.getID)
        .put(app.api.categories.update)
        .delete(app.api.categories.remove)
}