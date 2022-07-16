const router = require("express").Router();
const userRouter = require('./user')
const roomRouter = require('./room')
const bookingRouter = require('./booking')

router.use('/users', userRouter)
router.use('/rooms', roomRouter)
router.use('/bookings', bookingRouter)

module.exports = router;