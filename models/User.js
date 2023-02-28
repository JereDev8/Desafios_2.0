const mongoose= require('mongoose')


const collection= 'users'

const schema= new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    last_name:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'user'
    }
})

const userModel= mongoose.model(collection, schema)

module.exports= userModel