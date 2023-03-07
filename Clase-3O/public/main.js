const socket= io()

// DOM ELEMENTS
const botonCreate= document.getElementById("create")
const nombreProducto= document.getElementById("nombreProducto")
const precioProducto= document.getElementById("precioProducto")
const imgProducto= document.getElementById("imgProducto")
const contProducts= document.getElementById("products")
const btnSendMessage=document.getElementById("sendMessage")
const gmail= document.getElementById("gmail")
const msj=document.getElementById("mensaje")
const chat= document.querySelector(".cont-chat")

let fecha= new Date()


btnSendMessage.addEventListener("click",(e)=>{
    socket.emit("chat:message",{
        gmail:gmail.value,
        message:msj.value
    })
    e.preventDefault()
})

socket.on("chat:message", (data)=>{
    console.log(fecha.getHours() + ":" + fecha.getMinutes())
    chat.innerHTML+= `
    <div class="cont-msj">
    <strong> ${data[data.length-1].gmail} </strong> <p class="dataMensaje">(${data[data.length-1].date}): </p> 
    <p class="message"> ${data[data.length-1].message} </p>
    </div> 
    `
})


botonCreate.addEventListener("click",(e)=>{
    socket.emit("create:data", {
        name:nombreProducto.value,
        price:parseInt(precioProducto.value) ,
        thumbnail:imgProducto.value
    })
    e.preventDefault()
})

socket.on("create:data", (data)=>{
    contProducts.innerHTML+=`
    <tr>
            <td>
                ${data[data.length-1].name}
            </td>
            <td>
                ${data[data.length-1].price}
            </td>
            <td><img style="width: 5%;" src=${data[data.length-1].thumbnail} alt=""></td>
    </tr>
    `
})

