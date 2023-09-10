const mongoose  = require('mongoose')

const registerSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    createdOn:{
        type:Date,
        default:Date.now
    }
})


module.exports = registerSchema