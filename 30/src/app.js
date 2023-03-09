import express from 'express'
import cluster from 'cluster'
import os from 'os'

const app= express()
const PORT= process.env.PORT || 3000
const CPUs= os.cpus().length

if(cluster.isPrimary){
    console.log(`Creando el proceso padre con pid: ${process.pid}`)
    for(let i=0; i< CPUs; i++){
        cluster.fork()
    }
    cluster.on('exit', (worker)=>{
        console.log(`Proceso con PID ${worker.process.pid} muerto, Creando nuevo worker`)
        cluster.fork()
    })
}
else{
    console.log(`Proceso worker con PID: ${process.pid}`)
    app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`))
}

app.get('/operacion', (req, res)=>{
    let num= 0;
    for(let i= 0; i<10000000000; i++){
        num+= i
    }
    res.send(`El resultado de la operacion es: ${num}`)
})

app.get('/', (req, res)=>{
    res.send(`Request attended by process ${process.pid}`)
})
