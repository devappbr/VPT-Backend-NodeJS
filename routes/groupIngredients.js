module.exports = app => {

    app.route('/groupIngredients')
        .all(app.config.passport.authenticate())
        .get(app.api.groupIngredients.get)
        .post(app.api.groupIngredients.save)

    app.route('/groupIngredients/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.groupIngredients.getID)
        .put(app.api.groupIngredients.update)
        .delete(app.api.groupIngredients.remove)
}