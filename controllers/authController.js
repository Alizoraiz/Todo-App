 const jwt = require('jsonwebtoken')
//  const authenticateToken = async (req,res) => {
//      res.json(todo.filter(todo => todo.name === req.to.name))
//  }
 
 
 const login = async (req,res) => {


    //Authenticate Users

    const username = req.body.username
    const user = { name: username}
    const token = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    console.log(token)
    console.log(refreshToken)
    res.json({ accessToken: accessToken,refreshToken:refreshToken})
 }

 function authenticateToken(req,res,next){
     console.log("inside houn mein")
     const authHeader = req.headers['authorization']
     console.log(authHeader)
     const token = authHeader && authHeader.split(' ')[1]
     if (token == null) return res.sendStatus(401)

     jwt.verify( token,process.env.ACCESS_TOKEN_SECRET, (err, user) => {
         if ( err) return res.sendStatus(403)
         req.user = user
         next()
     })
 }
 function generateAccessToken(todo){
     return jwt.sign(todo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s'})

 }

 module.exports = {
    login,
    authenticateToken
}
