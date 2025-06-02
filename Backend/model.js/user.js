const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const userSchema=mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    Mobile: {
        type: Number,
        required: true
    },

 
    username:{
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    },

     isPremium: {
    type: Boolean,
    default: false,
  },
})


userSchema.pre('save', async function (next) {
    const person=this
    // Hash the Password only if it has been modified (or is new)

    if(!person.isModified('password')) return next()
    try {
//hash Password generation
        const salt=await bcrypt.genSalt(8)
        //hash Password
        const hashPassword=await bcrypt.hash(person.password, salt)

        person.password=hashPassword
        next()
    } catch (error) {
        return next(error)
    }
})

// userSchema.methods.comparePassword=async function (candiatePassword) {
//     try {
//         const isMatch=await bcrypt.compare(candiatePassword, this.Password)
//     } catch (error) {
//        throw error 
//     }
// }
//create person model


// userSchema.methods.comparePassword = async function (candidatePassword) {
//     try {
//       return await bcrypt.compare(candidatePassword, this.Password);
//     } catch (error) {
//       throw error;
//     }
//   };
  

userSchema.methods.comparePassword = async function(candidatePassword){
    try{
        // Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}
const person=mongoose.model('Person', userSchema)
module.exports=person