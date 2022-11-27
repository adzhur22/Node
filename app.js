const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const userRouter = require('./router/user.router');
const authRouter = require('./router/aubt.router');
const configs = require('./config/config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.json('Hello')
});

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json(err.message || 'something wrong');
});


app.listen(configs.PORT, async ()=>{
    await mongoose.connect(configs.MONGO_Url);
    console.log(`Server listen ${configs.PORT} !`)
});