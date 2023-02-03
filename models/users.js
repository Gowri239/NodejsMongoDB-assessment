const mongoose = require('mongoose');

const Schema = mongoose.Schema ;

const userSchema = new Schema ({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    phonenumber:{
        type: Number,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    projects:[{projectId:{type:Schema.Types.ObjectId , ref:'Project' }}]
})

module.exports = mongoose.model('User' , userSchema)

