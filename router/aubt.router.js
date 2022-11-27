const router = require('express').Router();

const controller = require('../controller/auth.controller');
const mdlwr = require('../middleware/auth.moddleware');
const userMdlwr = require('../middleware/middleware');

router.post('/login', mdlwr.isBodyValid, userMdlwr.getUserDynamically('email'), controller.login);



module.exports = router;

