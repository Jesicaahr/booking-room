const { Op } = require('sequelize')
const { Booking, Room, User } = require('../models')

class BookingControllers {
    static async create(req, res, next) {
        const {RoomId, purpose, booking_date} = req.body
        const UserId = req.currentUserId
        try {
            //check room availability based on date
            const bookedRoom = await Booking.findOne({
                where: {
                    RoomId, 
                    booking_date,
                    status: 'active'
                }
            })
            if(bookedRoom) {
                return next({
                    name : 'Bad Request',
                    errors: [{message: "This room is already booked"}]
                })
            }

            //check room from list room
            const room = await Room.findOne({
                where: {
                    id: RoomId
                }
            })
            if(room == null  || room.status == 'deleted') {
                return next({
                    name : 'Not Found',
                    errors: [{message: "Room not found"}]
                })
            }

            const newBooking = await Booking.create({
                UserId,
                RoomId,
                booking_date,
                purpose
            })

            return res.status(201).json({
                msg: 'Success booking room',
                newBooking
            })

            
        } catch (error) {
            return next(error)
        }



    }

    static showAllBooking(req, res, next) {
        Booking.findAll({
            where: {
                status: 'active'
            },
            include: [{ 
                model: User
            },{
                model: Room
            }],
            order: [['booking_date', 'ASC']]
        })
        .then(result => {
            return res.status(200).json({
                result
            })
        })
        .catch(err => {
            return next(err)
        })

    }

    static showUsersBooking(req, res, next) {
        const  UserId  = req.currentUserId
        Booking.findAll({
            where: {
                UserId,
                status: 'active'
            },
            include: {
                model: Room
            },
            order: [['booking_date', 'ASC']]
        })
        .then(result => {
            return res.status(200).json({
                result
            })
        })
        .catch(err => {
            return next(err)
        })

    }


    static async update(req, res, next) {
        const {id} = req.params
        const { UserId } = req.currentUserId
        const { RoomId, booking_date, purpose } = req.body

        try {
            if(!RoomId || !booking_date || !purpose) {
                return next({
                    name : 'Bad Request',
                    errors: [{message: "Please input update data value"}]
                })
            }
            //check bookingId
            const booking = await Booking.findOne({
                where: {
                    id,
                }
            }) 
            if(booking == null  || booking.status == 'deleted') {
                return next({
                    name : 'Not Found',
                    errors: [{message: "Booking not found"}]
                })
            }
 
            //check room availability based on date
            const bookedRoom = await Booking.findOne({
                where: {
                    status: {
                        [Op.eq] : 'active'
                    },
                    UserId: {
                        [Op.ne] : req.currentUserId
                    },
                    [Op.and] : [
                        {RoomId}, 
                        {booking_date}
                    ]
                }
            })
            if(bookedRoom) {
                return next({
                    name : 'Bad Request',
                    errors: [{message: "This room is already booked"}]
                })
            }

            //check room from list room
            const room = await Room.findOne({
                where: {
                    id: RoomId
                }
            })
            if(room == null  || room.status == 'deleted') {
                return next({
                    name : 'Not Found',
                    errors: [{message: "Room not found"}]
                })
            }

            let updateBooking = await Booking.update({
                RoomId, booking_date, purpose
            }, {
                where: {
                    id
                },
                returning: true,
            })

            return res.status(200).json({
                msg: 'Success update booking',
                booking: updateBooking[1]
            })
            
        } catch (error) {
            return next(error)
        }

    }

    static async delete(req, res, next) {
        const {id} = req.params
        try {
            let deleteBooking = await Booking.update({
                status: 'deleted', 
            },{
                where: {
                    id
                },
                returning: true,
            })
            if(deleteBooking[1].length == 0) {
                return next({
                    name : 'Not Found',
                    errors: [{message: "Booking not found"}]
                })
            }

            return res.status(200).json({
                msg: 'Success delete booking',
                booking: deleteBooking[1]
            })
        } catch (err) {
            return next(err)
            
        }
    }


}

module.exports = BookingControllers