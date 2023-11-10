const express = require('express');
const expressLayouts = require('express-ejs-layouts'); 
const morgan = require('morgan');
const path = require('path'); 
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieparser = require('cookie-parser');
const flash = require('connect-flash'); 

const app = express();
const port = process.env.PORT || 4000;

require('dotenv').config(); 
app.use(express.urlencoded({extended:true})); 
app.use(express.static( path.join(__dirname, './public')))
//app.use(express.static('public'));
//app.use('/static', express.static(__dirname + '/public'));
app.use(expressLayouts);
app.use(morgan('dev'));
app.use(cookieparser('CookingBlogSecure')); 
app.use(session({
  secret:'BlogSeguridadSecretSession',
  saveUninitialized:true,
  resave:true
}));
app.use(flash());
app.use(fileUpload()); 

app.set('layout', './layouts/main');
app.set('view engine', 'ejs'); 
const routes = require('./server/routes/recetasRutas'); 

app.use('/', routes);

app.listen(port, () => {
    console.log(' 🚀 El servidor ha despegado en el puerto ', port);
  });