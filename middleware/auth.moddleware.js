const authValidator = require('../validator/auth.validator');
const UserError = require("../error/user.error");
const {checkToken} = require("../service/oauth.service");
const Oauth = require('../dataBase/OAuth');
const {tokenTypeEnum} = require("../enum");

module.exports = {
    isBodyValid: async (req, res, next) => {
        try {
            let validate = authValidator.loginValidator.validate(req.body);

            if (validate.error) {
                throw new UserError(validate.error.message, 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkACCSESSToken: async (req, res, next) => {
        try {
            const accessToken = req.get('Authorization');

            if (!accessToken) {
                throw new UserError('No token', 401);
            }

            checkToken(accessToken);

            const tokenInfo = await Oauth.findOne({accessToken});

            if (!tokenInfo) {
                throw new UserError('Token no valid!', 401);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkREFRESHToken: async (req, res, next) => {
        try {
            const refreshToken = req.get('Authorization');

            if (!refreshToken) {
                throw new UserError('No token', 401);
            }

            checkToken(refreshToken, tokenTypeEnum.refreshToken);

            const tokenInfo = await Oauth.findOne({refreshToken});

            if (!tokenInfo) {
                throw new UserError('Token no valid!', 401);
            }

            req.tokenInfo = tokenInfo;
            next();
        } catch (e) {
            next(e);
        }
    }

}