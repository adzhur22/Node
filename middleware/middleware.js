const User = require("../dataBase/User");
const UserError = require("../error/user.error");
const {userService} = require("../service");
const userValidator = require("../validator/user.validator");
const commonValidator = require("../validator/common.validator");

module.exports = {

    checkIsEmailUnique: async (req, res, next) => {
        try {
            let {email} = req.body;
            if (!email) {
                throw new UserError('Email is require!', 400)
            }

            let user = await User.findOne({email});

            if (user) {
                throw new UserError('Email must be unique!', 409);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    isNewUserValid: async (req, res, next) => {
        try {
            let validate = userValidator.newUserValidator.validate(req.body);

            if (validate.error) {
                throw new UserError(validate.error.message, 400);
            }

            req.body = validate.value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserIdValid: async (req, res, next) => {
        try {
            const {id} = req.params;

            const validate = commonValidator.idValidator.validate(id);

            if (validate.error) {
                throw new UserError('Your ID is not correct!', 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isEditUserValid: async (req, res, next) => {
        try {
            let validate = userValidator.newUserValidator.validate(req.body);

            if (validate.error) {
                throw new UserError(validate.error.message, 400);
            }

            req.body = validate.value;

            next();
        } catch (e) {
            next(e);
        }
    },

    getUserDynamically: (filedName, from = 'body', dbFiled = filedName) => async (req, res, next) => {
        try {
            const filedToSearch = req[from][filedName]

            const user = await User.findOne({[dbFiled]: filedToSearch})

            if (!user) {
                throw new UserError('User not found', 404);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    }
}

