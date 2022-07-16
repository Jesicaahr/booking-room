const { verify } = require('../helpers/jwt')
const { User } = require('../models')

function authentication(req, res, next) {
    try {
        let decoded = verify(req.headers.access_token)
        User.findOne({
            where: {
                id : decoded.id
            }
        })
        .then(result => {
            if(result) {
                req.currentUserId = result.id,
                req.currentStatus = result.status
                next()
            }
            else {
                return next({
                    name : 'Not Found',
                    errors: [{message: "User not found"}]
                })
            }
        })
        .catch(err=> {
            return next({
                name : 'Unauthorized',
                errors: [{message: "User not authorized"}]
            })
        })
    }
    catch(err) {
        return next({
            name : 'JsonWebTokenError',
            errors: [{message: "Please login first"}]
        })
    }
}

module.exports = authentication