const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/users')

function isStringInvalid(string){
    if(string == undefined || string.length === 0){
        return true
    } 
    else{
        return false
    }
}

const signup = async (req,res) => {
    try{
        const {name,email,phonenumber,age,gender,password} = req.body
        console.log(email)
        if(isStringInvalid(name) || isStringInvalid(email) || isStringInvalid(phonenumber) || isStringInvalid(age) || isStringInvalid(gender) || isStringInvalid(password)){
            return res.status(400).json({message: "Enter all details",success: false})
        }

        const saltrounds = 10;
        const hashPassword = await bcrypt.hash(password,saltrounds)
        console.log("123",hashPassword)
    
        await User.create({name,email,phonenumber,age,gender,password : hashPassword})
        res.status(201).json({message:"signup successful",success:true })   
    }   
    catch(err){
        res.status(500).json({message:err,success:false})
    }
 }

 function generateAccessToken(id){
    return jwt.sign({userId: id},process.env.TOKEN_SECRET)
 }

 const login = async(req,res) => {
    try{
        const {email,password} = req.body
        console.log('emaolll',email)
        if(isStringInvalid(email) || isStringInvalid(password)){
            console.log(email)
            return res.status(400).json({message: "Enter all details",success:false})
        }

        const user = await User.findOne({email})
        console.log('loginnnn',user)
        if(!user){
            return res.status(404).json({message:'User not found'})
        }
        const foundUser = user;

        bcrypt.compare(password, foundUser.password, (err, matchPassUser)=>{
           if(!matchPassUser){
            return res.status(401).json({message:'User not authorized'})
           }

           return res.status(200).json({message:'login sucess' , token:generateAccessToken(foundUser._id)})
        });
        // else{
        //     res.status(404).json({message:"User not found",success:false})
        // }
    }
    catch(err){
        res.status(500).json({message:err,success:false})

    }

}

 module.exports = {signup,login};
   


