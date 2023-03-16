import mongoose from 'mongoose'


const collection= 'mensajes'

const model= new mongoose.Schema({
    author: Object,
    message: String
})

const mensajeModel= mongoose.model(collection, model)

export default mensajeModel