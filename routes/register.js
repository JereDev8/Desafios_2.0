const {Router}= require('express')
const userModel= require('../models/User.js')

const router= Router()

router.get('/register', (req, res)=>{
    res.render('register')
})

router.post('/register', async(req, res)=>{
    console.log(req.body)
    const {name, last_name, gmail, password} = req.body;
    if(!name || !last_name || !gmail || !password) return res.status(400).send({error: 'Falta llenar algun campo', status: 'Failed'})
    const exist= await userModel.findOne({email: gmail})
    // console.log(exist)
    if(exist) return res.status(400).send({error: 'Este gmail ya esta registrado', status: 'Failed'})
    await userModel.create({
        name: req.body.name,
        last_name: req.body.last_name,
        email: req.body.gmail,
        password: req.body.password
    })
    res.status(200).send({status: 'Success, Usuario creado correctamente'})
})

module.exports= router