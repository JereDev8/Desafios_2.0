const { Router } = require("express");

const router= Router();

router.get('/info', (req, res)=>{
    res.send(`
    Argumuentos de entrada: ${process.argv}, <br>
    Nombre de la plataforma: ${process.platform},<br>
    Version de Node.js: ${process.version},<br>
    Memoria total reservada: ${process.memoryUsage().heapTotal},<br>
    Path de Ejecucion: ${process.execPath},<br>
    Process ID: ${process.pid},<br>
    Carpeta del proyecto: ${process.cwd()}
    `)
})

module.exports= router

// console.log(process.argv)
// console.log(process.platform)
// console.log(process.version)
// console.log(process.memoryUsage())
// console.log(process.cwd())
// console.log(process.pid)
// console.log(process.execPath)