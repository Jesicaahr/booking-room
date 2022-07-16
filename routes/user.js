const router = require("express").Router();
const UserControllers = require("../controllers/userControllers");

router.post('/register', UserControllers.register)
router.post('/login', UserControllers.login)

module.exports = router;