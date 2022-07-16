const BookingControllers = require("../controllers/bookingControllers");
const authentication = require("../middlewares/authentication");
const { adminAuthorization, editAuthorization } = require("../middlewares/authorization");
const router = require("express").Router();

router.use(authentication)
router.post('/', BookingControllers.create)
router.get('/user', BookingControllers.showUsersBooking)
router.put('/:id', editAuthorization, BookingControllers.update)

router.use(adminAuthorization)
router.get('/', BookingControllers.showAllBooking)
router.delete('/:id', BookingControllers.delete)

module.exports = router;