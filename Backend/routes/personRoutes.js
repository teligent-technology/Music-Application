const express=require('express')
const router=express.Router()
const person=require('../model.js/user')
const {jwtMiddleWare, generateToken}=require('./../jwt')

//Post method 
router.post('/', async (req,res)=>{
    try {
      const data=req.body //Assuming the request body contains the person data
  
      const newPerson=new person(data)//create a new person document using the mongoose model
  
      const savedPerson=await newPerson.save()
      console.log("data Save");
        const payLoad={
            id: savedPerson.id,
            username: savedPerson.name
        }
console.log(payLoad);

      const token=generateToken(payLoad)

      console.log("token", token)
      res.status(200).json({savedPerson: savedPerson, token: token,  message: "User registered successfully",
      })
      
    } catch (error) {
      console.log(error);
      res.status(500).json({error: "Internal server error"})
      
    }
  })

//get method
  router.get('/',jwtMiddleWare,async(req,res)=>{
    try {
        const data=await person.find()
        console.log("data Fetched");
        res.status(200).json(data)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal Server error"})
    }
})


router.get('/:song', async(req,res)=>{
    try {
     const song=req.params.song
 
     if(song=="Punjabi" || song=="bhojpuri" || song=="Haryanvi"){
         const response=await person.find({Song: song})
         console.log("response Fetched")
         res.status(200).json(response)
     }else{
         res.status(400).json({error: "Ivalid song Type"})
     }
    } catch (error) {
     res.status(500).json({error: "Internal Server error"})
    }
 })

 router.put('/:id', async(req,res)=>{
    try {
        const personId=req.params.id
        const updatePersonData=req.body
        const response=await person.findByIdAndUpdate(personId, updatePersonData, {
            new: true,
            runValidators: true,
        })

        if(!response){
            return res.status(404).json({error: "Person not Found"})
        }
        console.log("data Update");
        res.status(200).json(response)
        
    } catch (error) {
     console.log(error)
     res.status(500).json({error: "Internal Server Error"})   
    }
 })

 router.delete('/:id', async(req,res)=>{
    try {
        const personId=req.params.id //Extract the person's ID from the Url Parameter

        //Assuming you have a Person model
        const response=await person.findByIdAndDelete(personId)
        if(!response){
            return res.status(404).json({error: "Person not Found"})
        }
        console.log("data delete");
        res.status(200).json({Person: "Data Delete Successfully"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server error"})
    }
 })


// router.post('/login', async(req,res)=>{
//     try {
//         const {username, Password}=req.body

//         const user=await person.findOne({username: username})
//         if(!user||  !(await user.comparePassword(Password))){
//         return   res.status(401).json({error: "Invalid username or Password"})
//         }

//         const payload={
//             id: user.id,
//             name: user.name
//         }
//         const token=generateToken(payload)
//         res.json(token)
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({error: "Internal server error"})
//     }
// })
 

router.post('/login', async(req, res) => {
    try{
        // Extract username and password from request body
        const {username, password} = req.body;

        // Find the user by username
        const user = await person.findOne({username: username});

        // If user does not exist or password does not match, return error
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        // generate Token 
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);

        // resturn token as response
        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

 module.exports=router
  