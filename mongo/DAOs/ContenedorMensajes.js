import mensajeModel from '../dbMensajes.js'
import mongoose from 'mongoose'
import { normalize, schema } from 'normalizr'



class ContenedorMensajes{

    async createMessage(mensaje){
    try {
        await mensajeModel.create({author:{
            id: mensaje.gmail,
            nombre: mensaje.nombre,
            apellido: mensaje.apellido,
            edad: mensaje.edad,
            alias: mensaje.alias,
            avatar: mensaje.avatar
        },
        message: mensaje.message})
    } catch (error) {
        throw new Error(error)
    }
}

    async normalizarMensajes(){
        try {
            const mensajes= await mensajeModel.find({})
            const autor= new schema.Entity('authors')
            const mensaje= new schema.Entity('mensajes', {
                author: autor
            }, {idAttribute: '_id'})

            const mensajesNormalizados= normalize(mensajes, mensaje)
            return mensajesNormalizados
            
        } catch (err) {
            throw new Error(err)
        }
    }


}


export default ContenedorMensajes

