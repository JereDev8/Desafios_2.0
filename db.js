const { knex }= require("knex")

class Contenedor{
    constructor(config, table){
        this.config= knex(config),
        this.table= table
    }

    async getByID(nroId){
        try{
            return await this.config.select("*").from(this.table).where('id', nroId)
        }
        catch(err){
            throw new Error(err)
        }
    }

    async deleteById(nroId){

        try{
            return await this.config.delete("*").from(this.table).where('id', nroId)
        }
        catch(err){
            throw new Error(err)
        }
    }

    async getAll(){
        try{
            return await this.config.select("*").from(this.table)
        }
        catch(err){
            throw new Error(err)
        }
    }

    
    async insert(producto){
        try{
            return await this.config.insert(producto).into(this.table)
        }
        catch(err){
            throw new Error(err)
        }     
    }
    
    async modifyProduct(nroId, newProduct){
        try{
            return await this.config.where({id:nroId}).update(newProduct).into(this.table)
        }
        catch(err){
            throw new Error(err)
        }
    }

    async getMessages(tableName){
        let exist=await this.config.schema.hasTable(tableName)
        if(exist){
            return await this.config.select("*").from(tableName)
        } 
        else{
            console.log("No existe una tabla de mensajes")
            await this.config.schema.createTable(tableName, (table)=>{
                table.string("message", 250);
                table.string("gmail", 50);
                table.string("date", 50)
                console.log("Tabla Creada")
            })
            
        }
    }


}

module.exports= {Contenedor}















































// const heroes= new Contenedor({
    //     client:'mysql',
    //     connection:{
        //         host:'localhost',
        //         database:'productos',
        //         password:'',
        //         user:'root'
        //     },
        //     pool:{min:0, max:10}
        // }, "products")
        
        // heroes.modifyProduct(12, {
            //     name: "Ventilador",
            //     price: 100,
            //     thumbnail:'https://http2.mlstatic.com/D_NQ_NP_626105-MLA32384814346_102019-O.webp'
            // })
            // heroes.getAll()
            
            // let producto={
                //     name: "Ventilador",
                //     price: 100,
                //     thumbnail:'https://http2.mlstatic.com/D_NQ_NP_626105-MLA32384814346_102019-O.webp'
                // }
                
                
                // heroes.insertProduct(producto)

// heroes.getByID(2)
// heroes.deleteById(14)


// async returnProducts(){
//     await this.config.select("*").from(this.table)
//     .then((respuesta)=> respuesta)
//     .catch((err)=> console.log(err))
// }

// async lastProduct(){
//     await this.config.select("*").from(this.table)
//     .then((respuesta)=> res.json(respuesta[respuesta.length-1]))
//     .catch((err)=> res.send(err))
// }