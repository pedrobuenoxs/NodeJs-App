const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose')

const Categoria = require("../models/Categorias")



router.get('/',(req,res) => {
    res.render("admin/index");
})

router.get('/posts', (req,res) => {
    res.send('Página de posts')
})

router.get('/categorias',(req,res) => {
    res.render('admin/categorias')
})


router.get('/categorias/add',(req,res) => {
    res.render('admin/addcategorias')
})

router.post('/categorias/nova',(req,res) => {
    const newCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }
    new Categoria(newCategoria).save().then(() => {
        console.log("Cadastrado com sucesso")
    }).catch((err) => {
        console.log("Erro ao cadastrar. " + err)
    })
})








module.exports = router;

