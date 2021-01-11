const moment = require('moment')

module.exports = app => {
    const get = (req, res) => {
        app.db('orders')
            .then(check => {
                if (res > 0) {
                    res.status(200).json(check)
                } else {
                    res.status(200).json({
                        msg: 'Mesa não cadastrada no sistema'
                    })
                }
            })
            .catch(err => res.status(400).json({
                status: 404,
                success: false,
                msg: err.sqlMessage
            }))



    }



    return { get }
}