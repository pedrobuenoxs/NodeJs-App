const express = require('express');
const categoria = require('../models/Categorias');

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
    
    Categoria.find().lean().then((categorias) => {
        res.render('admin/categorias',{categorias: categorias})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar as categorias")
        res.redirect("/admin")
    })

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

router.get('/categorias/edit/:id',(req,res) => {
    Categoria.findOne({_id:req.params.id}).lean().then((categoria) => {
        res.render('admin/editCategorias', {categoria: categoria})
    }).catch((err) => {
        req.flash('error_msg',"Esta categoria não existe")
        res.redirect("/admin/categorias")
    })
    
})

router.post('/categorias/edit',(req,res) => {



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
        res.redirect("/admin/categorias")
        
        
    } else {
    Categoria.findOne({_id: req.body.id}).then((categoria) => {
        
        categoria.nome = req.body.nome
        categoria.slug = req.body.slug

        categoria.save().then(() => {
            res.flash("success_msg","Categoria editada com sucesso")
            res.redirect("/admin/categorias")
            
        }).catch((err) => {
            req.flash('error_msg',"Erro interno")
            res.redirect("/admin/categorias")
        
        })
        
    }).catch((err) => {
        req.flash('error_msg',"Erro ao editar categoria")
        res.redirect("/admin/categorias")
    
    })
}

})

router.post('/categorias/deletar',(req,res) => {
    Categoria.deleteOne({_id:req.body.id}).then(() => {
        req.flash("success_msg", "categoria deletada com succeso")
        res.redirect("/admin/categorias")
    }).catch((err) => {
        req.flash('error_msg',"erro ao deletar categoriqa")
        res.redirect("/admin/categorias")
    })
})




module.exports = router;

