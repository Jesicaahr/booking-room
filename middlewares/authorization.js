const { Booking } = require('../models')

function editAuthorization(req, res, next) { //auth for edit booking
    Booking.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(result => {
        if(result) {
            if(result.UserId == req.currentUserId || req.currentStatus == 'admin') {
                return next()
            }
            else {
                return next({
                    name: 'Unauthorized',
                    errors: [{ message: 'You are not authorized' }]
                })
            }
        }
        else {
            return next({
                name: 'Not Found',
                errors: [{ message: 'Booking not found' }]
            })
        }
    })
    .catch(err => {
        return next({
            name: 'Internal Server Error',
            errors: [{ message: err }]
        })
    })
}

function adminAuthorization(req, res, next) { //auth admin for delete booking, CRUD Room
    try {
        if( req.currentStatus == 'admin') {
            return next()
        }
        else {
            return next({
                name: 'Unauthorized',
                errors: [{ message: 'You are not authorized' }]
            })
        }
        
    } catch (err) {
        return next({
            name: 'Internal Server Error',
            errors: [{ message: err }]
        })
    }
}

module.exports = {editAuthorization, adminAuthorization}