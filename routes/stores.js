module.exports = app => {

    app.route('/stores')
        .all(app.config.passport.authenticate())
        .get(app.api.stores.get)
        .post(app.api.stores.save)

    app.route('/stores/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.stores.getID)
        .put(app.api.stores.update)
        .delete(app.api.stores.remove)

     app.route('/stores/categories/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.stores.getStoresByCategory)
     
        app.route('/stores/:id/products')
        .all(app.config.passport.authenticate())
        .get(app.api.stores.getStoresProducts)



        
}