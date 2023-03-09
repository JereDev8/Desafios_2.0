
import { Router } from "express"

 
const router= Router()

router.get("/api/carrito", (req, res)=>{
    res.send("Hola mundo")

})



export default router