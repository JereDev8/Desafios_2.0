
// OBJETIVOS DESAFIO CLASE 24:
// 1) Que un usuario entre a register y se pueda registrar quedando su cuenta en mongo atlas
// 2) Que un usuario registrado pueda loguearse en /login
// 3) Que el usuario logueado se le cierre la sesion despues de un determinado tiempo, por ejemplo: 20s

// 1A- A la hora de registrarse no debe poder registrar un gmail que ya haya sido utilizado antes
// 1B- No puede registrarse si hay campos vacios

// 2A- A la hora de loguearse debe dispararse una cookie que deje su sesion iniciada por un tiempo establecido
// 2A- 



const express= require("express")
const path= require("path")
const SocketIO= require("socket.io")
const handlebars= require("express-handlebars")
const routeProductos= require("./routes/productos")
const routeCarrito= require("./routes/carrito")
const routeMensajes= require("./routes/mensajes.js")
const routeLogin= require('./routes/login.js')
const routeRegister= require('./routes/register.js')
const routeInfo= require('./routes/info.js')
const { Contenedor }= require("./db")
const config= require("./config")
const mongoose= require('mongoose')
const cookieParser= require('cookie-parser')
const session= require('express-session')
const MongoStore= require('connect-mongo')
const userModel= require('./models/User.js')
const env= require('dotenv').config()


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
    

const server= app.listen(3000, ()=> console.log("Server on port "+ process.env.PORT || 3010 ))




















// SOCKETS

const io= SocketIO(server)

io.on("connection",async (socket)=>{
    console.log("New connection")

    socket.on("create:data", async(data)=>{
        await dbProducts.insert(data) 
        io.sockets.emit("create:data", await dbProducts.getAll())
    })
    
    socket.on("chat:message", async (data)=>{
        // dbMessages.getMessages()
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



