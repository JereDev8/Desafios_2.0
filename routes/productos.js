const express= require("express")
const {Router}= require("express")
const router= Router()
const db =require("../config")
const knex= require("knex")
const {Contenedor}= require("../db")
const {faker}= require('@faker-js/faker')

function createProduct(){
    return {
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        thumbnail: faker.image.business()
    }
}

const database= new Contenedor(db.mariaDB, "products")

router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.get("/api/productos", async (req, res, next)=>{
    const prods= await database.getAll()
    res.json(prods)
    // let productos= await db.returnProducts()
    // await res.json(productos)
    
})

router.delete("/api/productos/:id", async (req, res)=>{
    await database.deleteById(req.params.id)
    const prods= await database.getAll()
    res.send(`Producto con id ${req.params.id} eliminado`)
    console.log(prods)
})

router.post("/api/productos", async (req, res)=>{
    await database.insert(req.body)
    const prods= await database.getAll()
    res.send(`Producto insertado`)
    console.log(prods)
})

router.put("/api/productos/:id", async(req, res)=>{
    await database.modifyProduct(req.params.id, req.body)
    const prods= await database.getAll()
    res.send(`Producto con id ${req.params.id} modificado`)
    console.log(prods)
})

router.get('/api/productos-test', (req, res)=>{
    let products= []
    for(let i= 0; i<5; i++){
        products.push(createProduct()) 
    }
    res.send(products)
})
 


module.exports= router