module.exports = {
    PORT: process.env.PORT || 5001,
    MONGO_Url: process.env.MONGO_URL || 'mongodb://localhost:27017/testProject',

    SECRET_ACCESS: process.env.SECRET_ACCESS || 'secretWord',
    SECRET_REFRESH: process.env.SECRET_REFRESH || 'Naruto'

}