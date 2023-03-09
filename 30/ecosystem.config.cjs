module.exports= {
    apps:[
        {
            name:'Servidor 1',
            script:'src/app.js',
            env:{
                PORT: 3001
            }
        },
        {
            name:'Servidor 2',
            script:'src/app.js',
            env:{
                PORT: 3002
            }
        },
        {
            name:'Servidor 3',
            script:'src/app.js',
            env:{
                PORT: 3003
            },
            exec_mode:'cluster',
            instances:2
        }
    ]
}