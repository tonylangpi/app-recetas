const express = require('express'); 
const router = express.Router(); 
const {allRecipes, category, recetaByCategory,platillo,searchReceta, explorarUltimoReceta,ramdomRecipe,submitReceta,PostRecipe}  = require('../controllers/recetas.controller'); 

/***
 * 
 * rutas de recetas 
 */
router.get('/', allRecipes); 
router.get('/categoria', category ); 
router.get('/categorias/:name',recetaByCategory)
router.get('/receta/:id',platillo); 
router.post('/search',searchReceta); 
router.get('/explore-latest', explorarUltimoReceta);
router.get('/explore-ramdom', ramdomRecipe); 
router.get('/submit-recipe', submitReceta); 
router.post('/postearReceta', PostRecipe); 
module.exports = router; 