console.log('hola mami')
const form= document.getElementById('formu')

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const datos= new FormData(form)
    const obj= {}
    datos.forEach((valor, key)=>{
        obj[key]= valor
    })
    fetch('/register', {
        method:'POST',
        body: JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(result=> result.json())
    .then(json=> console.log(json)) 
})