const express = require ('express')
const session = require('express-session')
const passport = require('passport')

require('dotenv').config();
const app = express();


//middleware

app.use(express.json());
app.use(express.urlencoded({extended: true}));



//Routers

import todoRouter from '../routes/todoRouter';
app.use('/api/todos',todoRouter)

import authRouter from '../routes/authRouter';
app.use('/api/auth',authRouter)

import userRouter from '../routes/userRouter';
app.use('/api/user',userRouter)


//Testing API

app.get('/',(req: any,res: any) =>{
    res.json({
        message: 'Hello form the API Land'
    })
})

//PORT

const PORT = process.env.PORT;

//Server

app.listen (PORT,(): void =>{
    console.log(`server is running on port ${PORT}`)
})