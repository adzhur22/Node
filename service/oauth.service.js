const bcrypt = require('bcrypt');
const UserError = require("../error/user.error");
const jwt = require("jsonwebtoken");

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),

    comparePasswords: async (password, hashPassword) => {
        const isPasswordsSame = await bcrypt.compare(password, hashPassword);

        if(!isPasswordsSame){
            throw new UserError ('Wrong email or password', 403)
        }
    },

    generateAccessTokenPair: (dataToSign = {})=> {
            const accessToken = jwt.sign(dataToSign, 'secretWord', {expiresIn: '15m'});
            const refreshToken = jwt.sign(dataToSign, 'Naruto', { expiresIn: '3d'});

            return {
                accessToken,
                refreshToken
            }
    }

}