const btn_deslog= document.getElementById('deslog')

btn_deslog.addEventListener('click', (e)=>{
    fetch('/FormularioYProductos', {
        method: 'DELETE',
    })
    .then((respuesta)=> console.log(''))
})