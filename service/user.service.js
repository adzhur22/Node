const User = require('../dataBase/User');

module.exports = {
    findByParams: async (filter)=>{
        return User.find(filter)
    },
    createUser: async (value)=>{
        return User.create(value)
    },
    changeUser: async (id, value)=>{
        return User.findByIdAndUpdate(id, value, {returnDocument:"after"})
    },
    deleteUserById: async (id)=>{
        return User.findByIdAndDelete(id)
    }
};