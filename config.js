module.exports= {
    mariaDB:{ 
        client:'mysql',
        connection:{
            host:'localhost',
            database:'productos',
            password:'',
            user:'root'
        },
        pool:{min:0, max:10}
    },
    sqlite3:{
        client: 'sqlite3',
        connection: {
            filename: `./DB/ecommerce.sqlite`
        },
        useNullAsDefault: true
    }
}