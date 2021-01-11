module.exports = app => {

    app.route('/tables')
        .all(app.config.passport.authenticate())
        .get(app.api.tables.get)
        .post(app.api.tables.save)

    app.route('/tables/:table')
        .all(app.config.passport.authenticate())
        .get(app.api.tables.getID)
        .put(app.api.tables.update)
        .delete(app.api.tables.remove)

    app.route('/tables/check/:idStore/:numberTable')
        .all(app.config.passport.authenticate())
        .get(app.api.tables.checkTableStores)
       

}
