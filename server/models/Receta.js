const mongoose = require('mongoose');

const recetaSchema = new mongoose.Schema({
    name:{
        type:String,
        required: 'Este campo es requerido'
    },
    description: {
        type:String,
        required:"Esta campo es requerido"
    },
    ingredients:{
        type:Array,
        required: "Los ingredientes son requeridos"
    },
    category:{
        type:String,
        enum: ['Americana','Mexicana','Hindú', 'China'],
        required: "Este campo es requerido"
    },
    image:{
        type:String,
        required:"La imagen de la receta es requerida"
    }
});

recetaSchema.index({name: 'text', description:'text'}); 
//wildcard indexing
//recetaSchema.index({"$**": 'text'}); 
module.exports = mongoose.model('Receta', recetaSchema); 