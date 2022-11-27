const User = require('../dataBase/User');
const {userService} = require("../service");
const oAuth = require("../service/oauth.service");

module.exports = {
    getAllUsers: async (req, res)=>{
       const users = await userService.findByParams({});
       res.json(users);
    },
    getUserById: async (req, res) =>{
        res.json(req.user);
    },
    createUser: async (req,res)=>{

        const pass = await oAuth.hashPassword(req.body.password)

       const value = await userService.createUser({...req.body, password: pass});
        res.status(201).json(value);
    },
    changeUserById: async (req, res) =>{
        let {id} = req.params;

       const value = await userService.changeUser(id, res.body)
        res.json(value);
    },
    deleteById: async (req, res) => {
        let {id} = req.params;

        await userService.deleteUserById(id)
        res.json('done');
    }
};