const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const userRouter = require('./router/user.router');
const configs = require('./config/config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.json('Hello')
});

app.use('/users', userRouter);

app.use((err, req, res, next) => {

    res.json(err.message);
});


app.listen(configs.PORT, async ()=>{
    await mongoose.connect('mongodb://localhost:27017/testProject');
    console.log(`Server listen ${configs.PORT} !`)
});