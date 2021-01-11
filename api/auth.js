const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        if (!req.body.cpf || !req.body.password) {
            return res.status(400).json({
                status: 400,
                error: 'Dados Incompletos'
            })
        }

        const user = await app.db('user')
            .where({ cpf: req.body.cpf })
            .first()

        if (user) {
            bcrypt.compare(req.body.password, user.pass, (err, isMatch) => {
                if (err || !isMatch) {
                    return res.status(401).json({
                        status: 401,
                        error: 'Senha incorreta, tente novamente'
                    })
                }
                const dateNow = Date.now()
                const payload = { cpf: user.cpf, dateNow }
                res.json({
                    cpf: user.cpf,
                    token: jwt.encode(payload, authSecret),
                })
            })

        } else {
            return res.status(401).json({
                status: 401,
                error: 'CPF nao encontrado'
            })
        }
    }
    return { signin }
}