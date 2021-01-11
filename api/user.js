const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const obterHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
        })
    }

    const signup = (req, res) => {
        obterHash(req.body.password, hash => {
            const password = hash

            app.db('user')
                .insert({ name: req.body.name, pass: password, cpf: req.body.cpf, email: req.body.email })
                .then(_ => res.status(200).json({
                    status:200,
                    success: true,
                    msg: 'Usuário cadastrado com sucesso'
                }))
                .catch(err => res.status(400).json(err))
        })
    }

    const get = (req, res) => {
        app.db('user')
            .orderBy('name')
            .then(user => res.json(user))
            .catch(err => res.status(500).json(err))
    }

    const getID = (req, res) => {
        app.db('user')
            .where({ id: req.params.id })
            .orderBy('name')
            .then(user => res.json(user))
            .catch(err => res.status(500).json(err))
    }

    const save = (req, res) => {
        app.db('user')
            .insert(req.body)
            .then(_ => res.status(200).json({
                status: 200,
                success: true,
                msg: 'Usuario salva com sucesso!'
            }))
            .catch(err => res.status(400).json({
                status: 404,
                success: false,
                msg: err
            }))
    }

    const update = (req, res) => {
        app.db('user')
            .where({ id: req.params.id })
            .update(req.body)
            .then(_ => res.status(200).json({
                status: 200,
                success: true,
                msg: 'Usuario alterada com sucesso!'
            }))
            .catch(err => res.status(400).json({
                status: 404,
                success: false,
                msg: err
            }))
    }

    const remove = (req, res) => {
        app.db('user')
            .where({ id: req.params.id })
            .del()
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    res.status(200).json({
                        status: 200,
                        success: true,
                        msg: 'Usuario removida com sucesso!'
                    })
                } else {
                    res.status(404).json({
                        status: 404,
                        success: true,
                        msg: 'Nao foi encontrado Usuario com o id ' + req.params.id
                    })
                }
            })
            .catch(err => res.status(400).json(err))
    }

    return { signup, get, save, remove, getID, update }

}