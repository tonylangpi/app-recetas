const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
    name:{
        type:String,
        required: 'Este campo es requerido'
    },
    image:{
        type:String,
        required:"Este campo es requerido"
    }
});

module.exports = mongoose.model('Categoria', categoriaSchema); 