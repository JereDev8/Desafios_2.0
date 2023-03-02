import express from 'express' 
import path from 'path'
import { Server } from 'socket.io'
import handlebars from 'express-handlebars'
import routeCarrito from './routes/carrito.js'
import routeMensajes from './routes/mensajes.js'
import routeLogin from './routes/login.js'
import routeInfo from './routes/info.js'
import routeRegister from './routes/register.js'
import routeProductos from './routes/productos.js'
import Contenedor from './db.js'
import config from './config.js'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import userModel from './models/User.js'
import env from 'dotenv'
import __dirname from './utils/__dirname.js'


env.config()

const conexion= mongoose.connect(process.env.MONGO_DB_URL, (err)=>{
    if(err) console.log(err)
    else console.log('Base de datos conectada correctamente')
})


const dbProducts= new Contenedor(config.mariaDB, "products") 
const dbMessages= new Contenedor(config.sqlite3, "messages")

const app= express()

const fecha= new Date()

// middlewares
app.use(cookieParser())
app.use(session({
    store:MongoStore.create({mongoUrl:process.env.MONGO_DB_URL, ttl: 20}),
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized: false
}))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(routeCarrito)
app.use(routeProductos)
app.use(routeMensajes)
app.use(routeLogin)
app.use(routeInfo)
app.use(routeRegister)
app.engine("handlebars", handlebars.engine())
app.set("views", "./views")
app.set("view engine", "handlebars")



app.get("/FormularioYProductos",async (req, res)=>{
    const productos= await dbProducts.getAll()
    const mensajes= await dbMessages.getAll()
    if(!req.session.user) res.render("productos", {productos, mensajes, fecha})
    else res.render("productos", {productos, mensajes, fecha, user: req.session.user})
})

app.delete('/FormularioYProductos', async (req, res)=>{
    req.session.destroy((err)=>{
        res.redirect('/login')
    })

    

})

app.get("/table", async (req, res)=>{
    let exist= await dbMessages.getMessages("messages")
    res.send(exist)
})
    

const server= app.listen(3000, ()=> console.log("Server on port "+ 3000 || 3010 ))




















// SOCKETS

const io= new Server(server)

io.on("connection",async (socket)=>{
    console.log("New connection")

    socket.on("create:data", async(data)=>{
        await dbProducts.insert(data) 
        io.sockets.emit("create:data", await dbProducts.getAll())
    })
    
    socket.on("chat:message", async (data)=>{
        if(dbMessages.config.schema.hasTable("messages")){
            let data2= {...data, date:`${fecha.getHours()}:${fecha.getMinutes()}`}
            await dbMessages.insert(data2)
            io.sockets.emit("chat:message", await dbMessages.getAll())
        }
        else{
            console.log("No existe una tabla de mensajes")
            await dbMessages.config.schema.createTable(tableName, (table)=>{
                table.string("message", 250);
                table.string("gmail", 50);
                table.string("date", 50)
                console.log("Tabla Creada")
            })
            let data2= {...data, date:`${fecha.getHours()}:${fecha.getMinutes()}`}
            await dbMessages.insert(data2)
            io.sockets.emit("chat:message", await dbMessages.getAll())
        }
    })
    
})
 


