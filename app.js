const db = require("./config/db")

//Módulos
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();

const path = require('path')

//grupo de rotas 'admin'
const admin = require('./routes/admin');

//config session
const session = require('express-session');
const flash = require('connect-flash');



//mongoose
const mongoose = require('mongoose');


//configurações
    //Sessão
    
    app.use(session({
        secret: 'teste',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    }))
    app.use(flash())

    //Middleware
    /
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        next()
    })


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

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log('Servidor on-line');
})