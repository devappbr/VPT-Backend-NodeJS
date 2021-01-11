module.exports = app => {

    app.route('/ingredients')
        .all(app.config.passport.authenticate())
        .get(app.api.ingredients.get)
        .post(app.api.ingredients.save)

    app.route('/ingredients/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.ingredients.getID)
        .put(app.api.ingredients.update)
        .delete(app.api.ingredients.remove)
}