const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const  Categoria = new Schema({
    nome: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

//Colection
const categoria = mongoose.model('categoria', Categoria);

module.exports = categoria;