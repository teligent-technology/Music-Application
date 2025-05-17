const jwt=require('jsonwebtoken')
require('dotenv').config();



const jwtMiddleWare=(req,res,next)=>{

if (req.method === 'OPTIONS') {
    return next();
  }
    //first check request headers has authoriation or not

    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({message: "Token Empty"})
    //extract the jwt token from the request headers

    // const token=req.headers.authorization.spilt('')[1]
    const token = req.headers.authorization.split(' ')[1]

    if(!token) return res.status(401).json({error: "Unauthorised"})

        try {
            //verify the token

            const decoded=jwt.verify(token, process.env.secret)

            //Attach user Information to the request object

            req.payLoad=decoded
            next()
        } catch (error) {
            console.log(error)
            res.status(401).json({message: "Invalid Token"})
        }
    }



//Function to generate JWT Token

const generateToken=(userData)=>{
    //Generate a new JWT token using user data

    return jwt.sign(userData, process.env.secret, {expiresIn: '1h'})
}

module.exports={jwtMiddleWare, generateToken}