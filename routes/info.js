import { Router } from "express";
import { fork } from "child_process";

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

router.get('/calculo', (req, res)=>{
    const forkeo= fork('./utils/CalcularNumeros')
    forkeo.send('ejecutate')
    forkeo.on('message', (msj)=>{
        res.send(`El valor del calculo es: ${msj}`)
    })
})

export default router

