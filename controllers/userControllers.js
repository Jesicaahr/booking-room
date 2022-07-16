const { decryptPassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { User } = require('../models')

class UserControllers {
    static register (req, res, next) {
        const {name, email, password} = req.body
        let payload = {
            name, email, password
        }
        User.create(payload)
        .then(result => {
            let user = {
                id: result.id,
                name: result.name,
                status: result.status
            }
            let token = generateToken(user)
            return res.status(201).json({
                access_token : token, 
                msg: 'Success register new user'
            })
        })
        .catch(err => {
            return next(err)
        })
    }

    static async login (req, res, next) {
        const {email, password} = req.body
        try {
            let payload = {
                email, password
            }
            if(email == undefined) {
                return next({
                    name : 'Bad Request',
                    errors: [{message: "Email/ password required"}]
                })
            }
            let user = await User.findOne({
                where: {
                    email: email.toLowerCase()
                }
            })
            if(user){
                let compare = decryptPassword(payload.password, user.password)
              
                if(compare){
                    let data = {
                        id: user.id,
                        email: user.email
                    }
                    let token = generateToken(data)
                    return res.status(200).json({
                        access_token : token
                    })
                }
                else {
                    return next({
                        name : 'Bad Request',
                        errors: [{message: "Invalid email/ password"}]
                    })
                }
            }
            else {
                return next({
                    name : 'Bad Request',
                    errors: [{message: "Invalid email/ password"}]
                })
            }
        } catch (error) {
            return next(error)
        }
    }

}

module.exports = UserControllers