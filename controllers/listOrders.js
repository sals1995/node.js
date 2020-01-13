var express = require("express")
var route = express.Router()
var app = express()

var bodyParser = require("body-parser")

var mongoose = require("mongoose")

app.set("viewengine", "ejs");
app.set("views", "./views");

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
route.post("/listOrders/orders", parseUrlencoded, function (req, resp) {

    var mealModel = mongoose.model("order");
    var order_meal = new mealModel()
    order_meal.ordertime = new Date();
    order_meal.note = req.body.note;
    order_meal.meals = req.body.mealsid;
    order_meal.save({
        $push: {
            "meals": req.body.mealsid
        }
    },function (err,data) {
        console.log("saved....")
        console.log(data)
        // console.log(err)
    
        console.log(order_meal);
    })
    mongoose.model("order").find(function(err,data)
    {
        mongoose.model("order").populate(data,{
            path: "meals"
        })
        resp.render("./listOrders/orders.ejs",{ meal_data: data })
    })
  
})

route.get('listOrder/orders', function (req, resp) {
    mongoose.model("meal").find(function (err, data) {
        
        // console.log(data.name);
        resp.render("./listOrders/orders", { meal_data: data })

    })


    console.log("this is MenuOrder/listOrder ...");

})
route.get('/details/:id', function (req, resp) {
    mongoose.model("order").findOne({
        _id : req.params.id
    }).populate('meals').exec(function (err,order){
        console.log(order.meals)
        resp.render("./listOrders/details", { detail_data: order })
    })
  
})



module.exports = route;