const moment = require('moment')

module.exports = app => {
    const get = (req, res) => {
        app.db('groupIngredients')
            .orderBy('name')
            .then(groupIngredients => res.json(groupIngredients))
            .catch(err => res.status(500).json(err))
    }

    const getID = (req, res) => {
        app.db('groupIngredients')
            .where({ id: req.params.id })
            .orderBy('name')
            .then(groupIngredients => res.json(groupIngredients))
            .catch(err => res.status(500).json(err))
    }

    const save = (req, res) => {
        app.db('groupIngredients')
            .insert(req.body)
            .then(_ => res.status(200).json({
                status: 200,
                success: true,
                msg: 'Ingrediente salva com sucesso!'
            }))
            .catch(err => res.status(400).json({
                status: 404,
                success: false,
                msg: err.sqlMessage
            }))
    }

    const update = (req, res) => {
        app.db('groupIngredients')
            .where({ id: req.params.id })
            .update(req.body)
            .then(_ => res.status(200).json({
                status: 200,
                success: true,
                msg: 'Ingrediente alterada com sucesso!'
            }))
            .catch(err => res.status(400).json({
                status: 404,
                success: false,
                msg: err.sqlMessage
            }))
    }

    const remove = (req, res) => {
        app.db('groupIngredients')
            .where({ id: req.params.id })
            .del()
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    res.status(200).json({
                        status: 200,
                        success: true,
                        msg: 'Ingrediente removida com sucesso!'
                    })
                } else {
                    res.status(404).json({
                        status: 404,
                        success: true,
                        msg: 'Nao foi encontrado Ingrediente com o id ' + req.params.id
                    })
                }
            })
            .catch(err => res.status(400).json({
                status: 404,
                success: false,
                msg: err.sqlMessage
            }))
    }

    return { get, save, remove, getID, update }
}