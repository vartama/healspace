const jwt = require('jsonwebtoken')
const user = require('../models/user')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'the-secret-key'

async function authentication(req, res, next) {
    try {
        const { access_token } = req.headers
        if (!access_token) throw { name: 'Unauthenticated' }

        const payload = jwt.verify(access_token, JWT_SECRET_KEY)

        const findUser = await user.findOne({ where: { id: payload.id } })
       
        if (!findUser) throw { name: 'Unauthenticated' }

        req.userData = {
            id: findUser.id,
            email: findUser.email
        }

        next()
    } catch (err) {
        next(err)
    }
}

module.exports = authentication