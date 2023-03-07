console.log('Hola bro')

const formulario= document.getElementById('formu-login')

formulario.addEventListener('submit', (e)=>{
    e.preventDefault()
    const datos= new FormData(formulario)
    const obj= {}
    datos.forEach((valor, key)=>{
        obj[key]= valor
    })
    fetch('/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(result=> result.json())
    .then(json=> console.log(json))
})