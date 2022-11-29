const dataBaseOauth = require('../dataBase/OAuth');
const {comparePasswords, generateAccessTokenPair} = require("../service/oauth.service");
const {tokenTypeEnum} = require("../enum");

module.exports = {

    login: async (req, res, next) => {
        try {
            const {user, body} = req;

            await comparePasswords(body.password, user.password);

            const tokenPair = generateAccessTokenPair({id: user.id});

            await dataBaseOauth.create({...tokenPair, _User_Id: user.id})

            res.json({user, tokenPair});
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const {refreshToken, _User_Id} = req.tokenInfo;

            await dataBaseOauth.deleteOne({refreshToken});

            const tokenPair = generateAccessTokenPair({id: _User_Id});

            await dataBaseOauth.create({...tokenPair, _User_Id})

            res.json(tokenPair);
        } catch (e) {
            next(e);
        }
    }

}