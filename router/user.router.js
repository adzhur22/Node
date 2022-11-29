const router = require('express').Router();
const controller = require('../controller/controller');
const middleware = require('../middleware/middleware')
const oauthMiddleware = require('../middleware/auth.moddleware')

router.get('/', controller.getAllUsers);
router.post('/',
    middleware.isNewUserValid,
    middleware.checkIsEmailUnique,
    controller.createUser);

router.get('/:id',
    middleware.isUserIdValid,
    oauthMiddleware.checkACCSESSToken,
    middleware.getUserDynamically('id', 'params', '_id'),
    controller.getUserById
);
router.patch('/:id',
    middleware.isUserIdValid,
    middleware.isEditUserValid,
    oauthMiddleware.checkACCSESSToken,
    middleware.getUserDynamically('id', 'params', '_id'),
    controller.changeUserById
);
router.delete('/:id',
    middleware.isUserIdValid,
    oauthMiddleware.checkACCSESSToken,
    middleware.getUserDynamically('id', 'params', '_id'),
    controller.deleteById
);

module.exports = router;