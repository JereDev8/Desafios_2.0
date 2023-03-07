process.on('message', ()=>{
    let num= 0
    for(i=0; i<1000000000; i++){
        num+=i
    }
    process.send(num)
})
