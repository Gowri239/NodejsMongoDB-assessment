const mongoose = require('mongoose');

const Schema = mongoose.Schema ;

const restpassSchema = new Schema ({
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    uuid:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Forgotpassword' , restpassSchema)