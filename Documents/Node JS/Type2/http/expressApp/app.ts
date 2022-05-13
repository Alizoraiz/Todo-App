const express = require ('express')
import todoRouter from '../routes/todoRouter';
import authRouter from '../routes/authRouter';
import userRouter from '../routes/userRouter';
require('dotenv').config();

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routers
app.use('/api/todos',todoRouter);
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);

//Testing API
app.get('/',(req: any,res: any) =>{
    res.json({
        message: 'Hello form the API Land'
    })
})

export default app