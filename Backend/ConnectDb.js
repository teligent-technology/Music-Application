const mongoose=require('mongoose')
require('dotenv').config(); // dotenv load करें


//Mongo Connection Url
const mongoURL='mongodb://127.0.0.1:27017/Music'
// const mongoURL="mongodb+srv://adityakumar:adityakumar124786@cluster0.j6wdzx9.mongodb.net/"
// const mongoURL=process.env.MONGODB_URL

mongoose.connect(mongoURL,{
    useNewUrlParser: true,
})


//Go the Default Connection
const db=mongoose.connection

//Define the event listeners for Database COnnection

db.on("connected", ()=>{
    console.log("Connected to Mongodb")
})

db.on('error', (err)=>{
    console.log("MongoDB Connection Error", err)
})

db.on('disconnected', ()=>{
    console.log("MongoDb Dissconnected")
})


module.exports=db