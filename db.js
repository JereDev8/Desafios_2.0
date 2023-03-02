
import knex from "knex"


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

export default Contenedor

