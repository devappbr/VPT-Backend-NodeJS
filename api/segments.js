const moment = require('moment')

module.exports = app => {
    const get = (req, res) => {
        app.db('segments')
            .orderBy('name')
            .then(segments => res.json(segments))
            .catch(err => res.status(500).json(err))
    }

    const getID = (req, res) => {
        app.db('segments')
            .where({ id: req.params.id })
            .orderBy('name')
            .then(segments => res.json(segments))
            .catch(err => res.status(500).json(err))
    }

    const save = (req, res) => {
        app.db('segments')
            .insert(req.body)
            .then(_ => res.status(200).json({
                status: 200,
                success: true,
                msg: 'Segmento salva com sucesso!'
            }))
            .catch(err => res.status(400).json({
                status: 404,
                success: false,
                msg: err.sqlMessage
            }))
    }

    const update = (req, res) => {
        app.db('segments')
            .where({ id: req.params.id })
            .update(req.body)
            .then(update => {
                if (update > 0) {
                    res.status(200).json({
                        status: 200,
                        success: true,
                        msg: 'Segmento alterado com sucesso!'
                    })
                } else {
                    res.status(404).json({
                        status: 404,
                        success: false,
                        msg: 'Nao foi encontrado Segmento com o id ' + req.params.id
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
        app.db('segments')
            .where({ id: req.params.id })
            .del()
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    res.status(200).json({
                        status: 200,
                        success: true,
                        msg: 'Segmento removida com sucesso!'
                    })
                } else {
                    res.status(404).json({
                        status: 404,
                        success: false,
                        msg: 'Nao foi encontrado Segmento com o id ' + req.params.id
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