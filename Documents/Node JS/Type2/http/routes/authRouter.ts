const session = require('express-session')
const passport = require('passport')
require('dotenv').config();

require('../../googleAuth')

const authRouter = require ('express').Router();

function isLoggedIn(req: any, res: any, next: any){
    req.user ? next() : res.sendStatus(401);
}

authRouter.use(session({secret:process.env.SECRET}));
authRouter.use(passport.initialize());
authRouter.use(passport.session());

//Google Auth

authRouter.get('/', (req: any, res: any) =>{
    res.send('<a href ="/api/auth/googleAuth">Auhtenticate with Google</a>');
});

authRouter.get('/googleAuth',        
    passport.authenticate('google',{scope: ['email','profile'], }
    )
);
authRouter.get('/google/callback',
    passport.authenticate('google',{
        successRedirect:'/api/auth/protected',
        failureRedirect: '/api/auth/failure'
    })
);

authRouter.get('/protected', isLoggedIn, (req: any, res: any) =>{
    res.send('Hello!');
});

authRouter.get('/logout', (req: any, res: any) =>{
    req.logout();
    req.session.destroy();
    res.send('Successfully Logged Out')
});

export default authRouter