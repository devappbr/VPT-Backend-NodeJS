const moment = require('moment')

module.exports = app => {
    const get = (req, res) => {
        app.db('products')
            .then(get => {
                if (get) {
                    res.status(200).json(get)
                } else {
                    res.status(500).json({
                        success: false,
                        msg: 'Nao foi encontrado produtos cadastrados',
                    })
                }
            })
            .catch(err => res.status(500).json({
                status: 500,
                success: false,
                msg: err.sqlMessage
            }))
    }

    const getID = (req, res) => {
        app.db('products')
            .where({ id: req.params.id })
            .orderBy('name')
            .then(products => res.json(products))
            .catch(err => res.status(400).json({
                status: 404,
                success: false,
                msg: err.sqlMessage
            }))
    }

    const getProductsByCategories = (req, res) => {
        app.db('products')
            .select('products.name', 'products.icon', 'products.id AS productsID', 'categories.name AS categoriesName',
            'stores.id AS idStores', 'products.price', 'products.description', 'stores.logo')
            .innerJoin('categories')
            .innerJoin('stores', 'stores.id', 'products.id_stores')
            .whereRaw('products.id_categories = categories.id')
            .andWhere({'products.id_categories': req.params.id})
            .then(stores => res.json(stores))
            .catch(err => res.status(500).json({
                status: 500,
                success: false,
                msg: err.sqlMessage
            }))
    }

    const save = (req, res) => {
        app.db('products')
            .insert(req.body)
            .then(_ => res.status(200).json({
                status: 200,
                success: true,
                msg: 'Produto salvo com sucesso!'
            }))
            .catch(err => res.status(400).json({
                status: 404,
                success: false,
                msg: err.sqlMessage
            }))
    }

    const update = (req, res) => {
        app.db('products')
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
        app.db('products')
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

    return { get, save, remove, getID, update, getProductsByCategories }
}