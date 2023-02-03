const mongoose = require('mongoose');

const Schema = mongoose.Schema ;

const projectSchema = new Schema({
    taskname:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    priority:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
    },
    projectId:{
        type:Schema.Types.ObjectId,
        ref:'Project',
        required:true   
    }
})

module.exports = mongoose.model('Task' , projectSchema)

