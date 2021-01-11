module.exports = app => {

    app.route('/orders')
        .all(app.config.passport.authenticate())
        .get(app.api.orders.get)
      

   
}