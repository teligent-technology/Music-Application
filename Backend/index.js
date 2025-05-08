const express=require('express')
const app=express()
const cors=require('cors')
const db=require('./ConnectDb')
const passport=require('./auth')
const bodyParser=require('body-parser')
app.use(bodyParser.json())



app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));
  // Define Middleware
const logRequest=(req,res, next)=>{
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`)
    next()// move on the next phase
}
//Middleware apply on All Routes
app.use(logRequest)




app.use(passport.initialize())
const localAuth=passport.authenticate('local', {session: false})
// app.get('/',localAuth, (req, res)=>{
//     res.send("I am Server")
// })
// app.get('/', function (req, res) {
//     res.send('Welcome to our Hotel');
// })


// app.post('/login', localAuth, (req, res) => {
//     res.status(200).json({ message: "Login successful", user: req.user });
//   });

  
const personRoutes=require('./routes/personRoutes')
app.use('/person', personRoutes)


app.listen(3000,()=>{console.log("server has Connected port no 3000")})



