const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config()


//middleware

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routers

const todoRouter = require('./routes/todoRouter')
app.use('/api/todos',todoRouter)

const authRouter = require('./routes/authRouter')
app.use('/api/auth',authRouter)



//Testing API

app.get('/',(req,res) =>{
    res.json({
        message: 'Hello form the API'
    })
})

//PORT

const PORT = process.env.PORT || 8080

//Server

app.listen (PORT,() =>{
    console.log(`server is running on port ${PORT}`)
})