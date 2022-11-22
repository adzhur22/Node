const User = require("../dataBase/User");

module.exports = {
checkIsUserExist: async (req, res, next) => {
    try{
        let {id} = req.params;

        const user = await User.findById(id);

        if(!user){
            throw new Error('User not found!')
        }

        req.user = user;

        next();
    }catch (e) {
        next(e);
    }



}
}