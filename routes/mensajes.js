const {Router}= require('express')
const ContenedorMensajes= require('../mongo/DAOs/ContenedorMensajes.js')


const router= Router()

const mensajes= new ContenedorMensajes()
 
router.post('/api/mensajes', async (req, res)=>{
    await mensajes.createMessage({
        gmail: req.body.gmail,
        nombre:req.body.nombre,
        apellido: req.body.apellido,
        edad:req.body.edad,
        alias:req.body.alias,
        avatar: req.body.avatar,
        message: req.body.message
    })

    res.send('Mensaje enviado correctamente')
})

router.get('/api/mensajes',async (req, res)=>{
    const messages= await mensajes.normalizarMensajes()
    res.send(messages)
})

module.exports= router