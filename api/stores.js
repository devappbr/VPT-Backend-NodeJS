const moment = require('moment')

module.exports = app => {
    const get = (req, res) => {
        app.db('stores')
            // .select('stores.name', 'stores.logo', 'stores.id', 'segments.name AS segmentName', 'categories.name AS categoriesName')
            .select('stores.name', 'stores.logo', 'stores.id', 'segments.name AS segmentName')

            .innerJoin('segments')
            // .innerJoin('categories', 'categories.id', 'stores.id_categories')
            .whereRaw('stores.id_segment = segments.id')
            // .andWhere('stores.id_categories', 'categories.id')
            .then(stores => res.json(stores))
            .catch(err => res.status(500).json({
                status: 500,
                success: false,
                msg: err.sqlMessage
            }))
    }

    const getID = (req, res) => {
        app.db('stores')
            .where({ id: req.params.id })
            .orderBy('name')
            .then(stores => res.json(stores))
            .catch(err => res.status(400).json({
                status: 404,
                success: false,
                msg: err.sqlMessage
            }))
    }

    const getStoresProducts= (req, res) => {
        const currency = 'R$'
        app.db('stores')
            // .select('stores.id AS idStores', 'stores.name', 'products.id AS idProducts', 
            // 'products.name AS productsName', 'products.icon', 'products.description','products.price')
            .select('*','stores.name AS nameStores','stores.id AS idStores')
            .innerJoin('products')
            .whereRaw('stores.id = products.id_stores')
            .andWhere({'stores.id': req.params.id})
            .then(stores => res.json(stores))
            .catch(err => res.status(500).json({
                status: 500,
                success: false,
                msg: err.sqlMessage
            }))
    }

    const getStoresByCategory = (req, res) => {
        app.db('stores')
            .select('stores.name', 'stores.logo', 'stores.id', 'categories.name AS categoriesName')
            .innerJoin('categories')
            .whereRaw('stores.id_categories = categories.id')
            .andWhere({'stores.id_categories': req.params.id})
            .then(stores => res.json(stores))
            .catch(err => res.status(500).json({
                status: 500,
                success: false,
                msg: err.sqlMessage
            }))
    }

    const save = (req, res) => {
        app.db('stores')
            .insert(req.body)
            .then(_ => res.status(200).json({
                status: 200,
                success: true,
                msg: 'Store salva com sucesso!'
            }))
            .catch(err => res.status(400).json({
                status: 404,
                success: false,
                msg: err.sqlMessage
            }))
    }

    const update = (req, res) => {
        app.db('stores')
            .where({ id: req.params.id })
            .update(req.body)
            .then(update => {
                if (update > 0) {
                    res.status(200).json({
                        status: 200,
                        success: true,
                        msg: 'Store alterado com sucesso!'
                    })
                } else {
                    res.status(404).json({
                        status: 404,
                        success: true,
                        msg: 'Nao foi encontrado Store com o id ' + req.params.id
                    })
                }
            })
            .catch(err => res.status(400).json({
                status: 404,
                success: false,
                msg: err.sqlMessage
            }))
    }

    const remove = (req, res) => {
        app.db('stores')
            .where({ id: req.params.id })
            .del()
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    res.status(200).json({
                        status: 200,
                        success: true,
                        msg: 'Store removida com sucesso!'
                    })
                } else {
                    res.status(404).json({
                        status: 404,
                        success: true,
                        msg: 'Nao foi encontrado Store com o id ' + req.params.id
                    })
                }
            })
            .catch(err => res.status(400).json({
                status: 404,
                success: false,
                msg: err.sqlMessage
            }))
    }

    return { get, save, remove, getID, update, getStoresByCategory, getStoresProducts}
}