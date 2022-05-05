//Módulos
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();

const path = require('path')

//grupo de rotas 'admin'
const admin = require('./routes/admin');

//mongoose
const mongoose = require('mongoose');

//configurações
    //body-parsers
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    //handlebars
    app.engine('handlebars',handlebars.engine({defaultLayout: 'main'}));
    app.set('view engine','handlebars');

    //Mongoose
    mongoose.Promise = global.Promise;

    mongoose.connect("mongodb://localhost/db1").then(() => {
        console.log("Conectado com sucesso!")
    }).catch((erro) =>{
        console.log("Problema ao se conectar..." + erro)
    })

    //arquivos estaticos
    app.use(express.static(path.join(__dirname,'public')))
//rotas
    app.use('/admin',admin);

//servidor

const PORT = 8081;
app.listen(PORT,() => {
    console.log('Servidor on-line');
})