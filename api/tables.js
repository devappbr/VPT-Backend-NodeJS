const moment = require('moment')

module.exports = app => {
    const get = (req, res) => {
        app.db('tables')
            .then(tables => res.json(tables))
            .catch(err => res.status(500).json({
                status: 500,
                success: false,
                msg: err.sqlMessage
            }))
    }

    const getID = (req, res) => {
        app.db('tables')
            .where({ number_table: req.params.table })
            .then(tables => res.json(tables))
            .catch(err => res.status(500).json(err))
    }

    const checkTableStores = (req, res) => {

        app.db('tables')
            .select('stores.name', 'tables.numberTable', 'stores.id AS idStores')
            .innerJoin('stores', 'stores.id', 'tables.id_stores')
            .where({ numberTable: req.params.numberTable })
            .andWhere({ 'stores.id': req.params.idStore })
            .then(check => {
                const result = check.map(d => ({
                    name: d.name, numberTable: d.numberTable,
                    idStores: d.idStores, msg: `Você está em ${d.name} na Mesa ${d.numberTable}?`
                }))
                if (check.length > 0) {
                    res.json(result)
                } else {
                    res.status(200).json({
                        erro: 'Mesa não cadastrada no sistema'
                    })
                }
            })
            .catch(err => res.status(500).json({
                status: 500,
                success: false,
                msg: err.sqlMessage
            }))


    }

    const save = (req, res) => {
        app.db('tables')
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
        app.db('tables')
            .where({ number_table: req.params.table })
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
                        msg: 'Nao foi encontrado a mesa' + req.params.number_table
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
        app.db('tables')
            .where({ number_table: req.params.table })
            .del()
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    res.status(200).json({
                        status: 200,
                        success: true,
                        msg: 'Mesa removida com sucesso!'
                    })
                } else {
                    res.status(404).json({
                        status: 404,
                        success: true,
                        msg: 'Nao foi encontrado Mesa com o id ' + req.params.id
                    })
                }
            })
            .catch(err => res.status(400).json({
                status: 404,
                success: false,
                msg: err.sqlMessage
            }))
    }

    return { get, save, remove, getID, update, checkTableStores }
}