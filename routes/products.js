module.exports = app => {

    app.route('/products')
        .all(app.config.passport.authenticate())
        .get(app.api.products.get)
        .post(app.api.products.save)

    app.route('/products/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.products.getID)
        .put(app.api.products.update)
        .delete(app.api.products.remove)

    app.route('/products/categories/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.products.getProductsByCategories)
}