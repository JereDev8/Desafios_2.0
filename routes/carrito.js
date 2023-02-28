const {Router}= require("express")
const router= Router()
const {db}= require("../server.js")

router.get("/api/carrito", (req, res)=>{
    res.send("Hola mundo")
    console.log(db)
})



module.exports= router