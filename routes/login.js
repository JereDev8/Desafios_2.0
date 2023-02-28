const {Router}= require('express')
const userModel= require('../models/User.js')

const router= Router()

router.get('/login', (req, res)=>{
    res.render('login')
})

router.post('/login', async (req, res)=>{
    const {gmail, password}= req.body
    if(!gmail || !password) return res.status(400).send({status: 'Failed', error: 'Los campos estan vacios'})
    const exist= await userModel.findOne({email: gmail, password});
    if(!exist) return res.status(400).send({status:'Failed', error: 'El usuario no existe'})
    req.session.user= {
        id: exist._id,
        gmail: exist.email,
        role: exist.role,
        name: exist.name
    }
    console.log(req.session.user)
    res.status(200).send({status: 'Success', message:'Usuario logueado exitosamente'})
})


router.get('/check', (req, res)=>{ 
    res.render('check', {user: req.session.user})
    // console.log(req.session.user)
})

module.exports= router