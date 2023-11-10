const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error de conexion'));
db.once('open', function(){
    console.log('conexion exitosa'); 
}); 

require('./Categoria');
require('./Receta'); 