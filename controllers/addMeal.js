var express = require("express")
var route = express.Router()
var app = express()

var bodyParser = require("body-parser")

var mongoose = require("mongoose")

app.set("viewengine", "ejs");
app.set("views", "./views");

route.get('/add', function (req, resp) {
    console.log("this is Menu/add ...");
    resp.render("./addMeal/add");

})

var parseUrlencoded = bodyParser.urlencoded({ extended: true })

// for img
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");


cloudinary.config({
    cloud_name: 'asmaasals',
    api_key: "648934691676397",
    api_secret: 'okA2NWDmGZbXWlgw8y6--lQkFUs'
});
const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "demo",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
});
const parser = multer({ storage: storage });
route.post("/added", parseUrlencoded,parser.single("img"), function (req, resp) {

    var mealModel = mongoose.model("meal")
    var new_meal = new mealModel()
    new_meal.name = req.body.name;
    new_meal.price = req.body.price;
    new_meal.description = req.body.description;
    new_meal.img = req.body.img;
    new_meal.note = req.body.note;
    new_meal.save(function (err) {
        console.log(new_meal);
    })
    console.log(req.file) // to see what is returned to you
/*     const image = {};
    image.url = req.file.url;console.log(req.file.url)
    image.id = req.file.public_id;
    Image.create(image) // save image information in database
      .then(newImage => res.json(newImage))
      .catch(err => console.log(err));
    console.log(req.file.url) */

    resp.redirect("/Menu/listMeals");
    resp.end()
    // resp.send("this is add")


})

route.get('/listMeals', function (req, resp) {
    mongoose.model("meal").find(function (err, data) {
        
        // console.log(data.name);
        resp.render("./addMeal/list", { meal_data: data })

    })


    console.log("this is Menu/listMeals ...");

})


// exports.getprods=(req,res,next)=>{
//     var proid=req.params.productid
//     mongoose.model("meal").findById(proid).then(pro =>{
//         res.render("./addMeal/details", { list_data: pro })


//                     })
//                     .catch(err=>console.log(err))
             
//             console.log("this is Menu/listMeals ...");
        
//         }

//  route.get('/listMeals/:productid',getprods())




// function findUser(email, callback){
//     User.findOne({email: email}, function(err, userObj){
//         if(err){
//             return callback(err);
//         } else if (userObj){
//             return callback(null,userObj);
//         } else {
//             return callback();
//         }
//     });
// }





// route.get('/listMeals/:productid', function (req, resp) {
//     var proid=req.params.productid
//     mongoose.model("meal").findById(proid).then(pro =>{
//                 console.log(pro)


//         resp.render("./addMeal/details", { list_data: pro })


//             })
//             .catch(err=>console.log(err))
     
//     console.log("this is Menu/listMeals ...");

// })



module.exports = route;