require('../models/db');
const categorias = require('../models/Categoria');
const receta = require('../models/Receta'); 
/**
 * 
 * GET / PAGE
 * HOMEPAGE RECETAS
 */

const allRecipes = async(req,res) =>{
    try {
        const categories = await categorias.find();
        const recetas = await receta.find({}).sort({_id:-1}).limit(5);
        const food  = {recetas}
        res.render('index',{title: "Blog Recetas -Home", categories, food}); 
    } catch (error) {
        console.log(error); 
        res.json({message:"algo ha ocurrido"}); 
    }
}; 

const category = async(req,res) =>{
    try {
        const categories = await categorias.find(); 
        res.render('categorias',{title: "Blog Recetas -Categorias", categories}); 
    } catch (error) {
        res.status(500).json("message: Ocurrio algo"); 
    }
}
const recetaByCategory = async(req,res) =>{
    const {name} = req.params; 
    try {
            const recetas = await receta.find({'category':name});
            const food = {recetas}
            res.render('recetasPorCategoria', {title: "Blog Recetas -Recetas Por categoria", food, name})
    } catch (error) {
        console.log(error);
        res.json({"message": "Algo salio mal..."}); 
    }
}

const platillo = async(req,res) =>{
    const {id} = req.params; 
    try {
            const recetas = await receta.findById(id);
            res.render('receta', {title: "Blog Recetas -Detalle Receta", recetas})
    } catch (error) {
        console.log(error);
        res.json({"message": "Algo salio mal..."}); 
    }
}

const searchReceta = async(req,res) =>{
    try {
        const{searchTerm} = req.body;
        let recetita = await receta.find({$text:{$search:searchTerm, $diacriticSensitive: true}}); //busca las recetas por parametro de name y description
        res.render('search', {title: "Blog Recetas -Detalle Receta", recetita})
    } catch (error) {
        console.log(error);
        res.json({message:"algo salio mal"})
        }
}; 

const explorarUltimoReceta = async(req,res) =>{
    try {  
         const limitnum = 20; 
         const recipes = await receta.find({}).sort({_id: -1}).limit(limitnum); 
         res.render('explore-latest', {title: "Blog Recetas -Lo ultimo en recetas", recipes});
    } catch (error) {
        console.log(error); 
        res.json({message:"algo salio mal"}); 
    }
}

const ramdomRecipe = async(req,res) =>{
    try {
        let countRows = await receta.find().countDocuments(); 
        let ramdom = Math.floor(Math.random() * countRows); 
        let recetaRamdom = await receta.findOne().skip(ramdom).exec(); 
        res.render('explore-ramdom', {title: "Blog Recetas -Aleatorio", recetaRamdom});
    } catch (error) {
        console.log(error); 
        res.json({message:"algo ocurrio"}); 
    }
}

const submitReceta = async(req,res) =>{
    try {
        const infoErrorObject = req.flash('infoErrors');
        const infoSubmitObject = req.flash('infoSubmit'); 
        res.render('submit-recipe', {title: "Blog Recetas -Compartir receta",infoErrorObject,infoSubmitObject});
    } catch (error) {
        console.log(error);
        res.json({message:"algo ocurrio"}); 
    }
}

const PostRecipe = async(req,res) =>{
    try {
        let imageUploadFile;
    let uploadPath;
    let newImageName;

    if(!req.files || Object.keys(req.files).length === 0){
      console.log('El archivo no ha sido subido');
    } else {

      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath = require('path').resolve('./') + '/public/img/' + newImageName;

      imageUploadFile.mv(uploadPath, function(err){
        if(err) return res.satus(500).send(err);
      })

    }

    const newRecipe = new receta({
      name: req.body.name,
      description: req.body.description,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: newImageName
    });
    
    await newRecipe.save();
        req.flash('infoSubmit','Su receta ha sido agregada'); 
        res.redirect('/submit-recipe'); 
    } catch (error) {
        req.flash('infoErrors',error); 
        res.redirect('/submit-recipe');  
    }
}
// async function insertCategoriaData(){
//     try {
//         await categorias.insertMany([
//             {
//                 "name":"Comida Americana",
//                 "image":"Americana.jpg"
//             },
//             {
//                 "name":"Comida Mexicana",
//                 "image":"mexicana.jpg"
//             },
//             {
//                 "name":"Comida Hindú",
//                 "image":"indianfood.jpg"
//             },
//             {
//                 "name":"Comida China",
//                 "image":"comida_china.jpg"
//             }
//         ]); 
//     } catch (error) {
//         console.log('err', + error); 
//     }
// }
// insertCategoriaData(); 

// async function insertDymmyRecipeData(){
//   try {
//     await receta.insertMany([
//       { 
//         "name": "Carnitas",
//         "description": `Los domingos, las carnitas conforman uno de los rituales más íntimos de la vida en México`,
//         "email": "recipeemail@raddy.co.uk",
//         "ingredients": [
//           "2 onzas de ajonjolí tostado",
//           "2 onzas de pepitoria tostada",
//           "15 tomates bien maduros",
//           "2 chiles pasas",
//           "1 raja de canela",
//           "2 champurradas",
//         ],
//         "category": "Mexicana", 
//         "image": "carnitascomida.jpg"
//       }
//     ]);
//   } catch (error) {
//     console.log('err', + error)
//   }
// };

// insertDymmyRecipeData(); 

module.exports ={
  allRecipes,
  category,
  recetaByCategory,
  platillo,
  searchReceta,
  explorarUltimoReceta,
  ramdomRecipe,
  submitReceta,
  PostRecipe
}; 
