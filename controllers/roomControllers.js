const { Room } = require('../models')

class RoomControllers {
    static async addNew (req, res, next){
        const { name } = req.body
        try {
            const room = await Room.findOne({
                where: {
                    name,
                    status: 'active'
                }
            })
            if(room) {
                return next({
                    name : 'Bad Request',
                    errors: [{message: "This name already exist"}]
                })
            }
            const newRoom = await Room.create({
                name
            })

            return res.status(201).json({
                msg: 'Success add new room',
                newRoom
            })
        } catch (err) {
            return next(err)
        }
    }

    static showAll (req, res, next) {
       Room.findAll({
        where: {
            status: 'active'
        },
        order: [['name', 'ASC']]
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

    static async update(req, res, next){
        const {id} = req.params
        const { name } = req.body
        try {
            let updateRoom = await Room.update({
                name, 
            },{
                where: {
                    id
                },
                returning: true
            })

            return res.status(200).json({
                msg: 'Success update room',
                room: updateRoom[1]
            })
        } catch (err) {
            return next(err)
            
        }
    }

    static async delete(req, res, next){
        const {id} = req.params
        try {
            let deleteRoom = await Room.update({
                status: 'deleted', 
            },{
                where: {
                    id
                },
                returning: true
            })
            if(deleteRoom[1].length == 0) {
                return next({
                    name : 'Not Found',
                    errors: [{message: "Room not found"}]
                })
            }

            return res.status(200).json({
                msg: 'Success delete room',
                room: deleteRoom[1]
            })
        } catch (err) {
            return next(err)
            
        }

    }

}

module.exports = RoomControllers