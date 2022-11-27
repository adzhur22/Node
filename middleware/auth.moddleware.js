const authValidator = require('../validator/auth.validator');
const UserError = require("../error/user.error");

module.exports = {
    isBodyValid: async (req, res, next) => {
        try {
               let validate = authValidator.loginValidator.validate(req.body);

                if(validate.error){
                    throw new UserError(validate.error.message, 400);
                }

            next();
        } catch (e) {
            next(e);
        }
    }

}