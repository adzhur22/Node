const User = require('../dataBase/User');

module.exports = {
    getAllUsers: async (req, res, next)=>{
       const users = await User.find({});
       res.json(users);

    },
    getUserById: async (req, res, next) =>{
        res.json(req.user);
    },
    createUser: async (req,res,next)=>{
       await User.create(req.body)
        res.json('good!')
    },

}