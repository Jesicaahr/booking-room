const router = require("express").Router();
const RoomControllers = require('../controllers/roomControllers');
const { adminAuthorization } = require("../middlewares/authorization");
const authentication = require("../middlewares/authentication")


router.use(authentication)
router.get('/', RoomControllers.showAll)

router.use(adminAuthorization)
router.post('/', RoomControllers.addNew)
router.put('/:id', RoomControllers.update)
router.delete('/:id', RoomControllers.delete)

module.exports = router;