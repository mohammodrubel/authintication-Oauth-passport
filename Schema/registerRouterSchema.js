const mongoose  = require('mongoose')
const encrypt = require ('mongoose-encryption')

const registerSchema = new mongoose.Schema({
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

const encKey = process.env.ENCKEY;
registerSchema.plugin(encrypt, { secret: encKey,  encryptedFields: ['password'] });
module.exports = registerSchema