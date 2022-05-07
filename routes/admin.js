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

    var erros = [];

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({
            texto: "Nome inválido"
        })
        
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({
            texto: "Slug inválido"
        })
        
    }

    if(erros.length > 0){
        res.render("admin/addcategorias", {erros: erros})
        
    } else {
        
        const newCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        };
    
        new Categoria(newCategoria).save().then(() => {
            req.flash('success_msg', "Successfully created category!");
            res.redirect("/admin/categorias")
        }).catch((err) => {
            req.flash("error_msg", "There was an error registering the category, please try again!");
            res.redirect("/admin")
            
        })
    }

 
    
})








module.exports = router;

