const router = require('express').Router();
const controller = require('../controller/controller');
const middleware = require('../middleware/middleware')

router.get('/', controller.getAllUsers);
router.post('/', controller.createUser);

router.get('/:id', middleware.checkIsUserExist , controller.getUserById);

module.exports = router;