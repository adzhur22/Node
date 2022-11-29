const bcrypt = require('bcrypt');
const UserError = require("../error/user.error");
const jwt = require("jsonwebtoken");
const {SECRET_ACCESS, SECRET_REFRESH} = require("../config/config");

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),

    comparePasswords: async (password, hashPassword) => {
        const isPasswordsSame = await bcrypt.compare(password, hashPassword);

        if (!isPasswordsSame) {
            throw new UserError('Wrong email or password', 403)
        }
    },

    generateAccessTokenPair: (dataToSign = {}) => {
        const accessToken = jwt.sign(dataToSign, SECRET_ACCESS, {expiresIn: '15s'});
        const refreshToken = jwt.sign(dataToSign, SECRET_REFRESH, {expiresIn: '3d'});

        return {
            accessToken,
            refreshToken
        }
    },

    checkToken: (token = '', tokenType = 'accessToken') => {
        try {
            let secret = '';

            if (tokenType === 'accessToken') secret = SECRET_ACCESS;
            if (tokenType === 'refreshToken') secret = SECRET_REFRESH;
            return jwt.verify(token, secret)

        }catch (e) {
            throw new UserError('Token not valid', 401);
        }

    }
}