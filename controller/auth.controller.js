const dataBaseOauth = require('../dataBase/OAuth');
const {comparePasswords, generateAccessTokenPair} = require("../service/oauth.service");

module.exports = {

    login: async (req, res, next) => {
        try {
            const {user, body} = req;

            await comparePasswords(body.password, user.password);

            const tokenPair = generateAccessTokenPair({id: user.id});

            await dataBaseOauth.create({...tokenPair, _User_Id: user.id})

            console.log(tokenPair);
            console.log('***********');
            console.log(user.id);

            res.json(tokenPair);
        } catch (e) {
            next(e);
        }
    },

}