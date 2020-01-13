var express =require("express")
var bodyParser= require("body-parser")
var mongoose=require("mongoose");
var fs=require('fs')
var addController= require('./controllers/addMeal')
var checkController= require('./controllers/checkOut')
var listController= require('./controllers/listOrders')
// var menurout=require('./routes/Menu')
var loginController = require('./controllers/admin')

//create my server
var app = express()

//set template engine  
app.set("view engine","ejs");
app.set("views","./views");

app.use(function (req, resp, next) {
  resp.setHeader("Access-Control-Allow-Origin", "*");
  resp.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  next()
})
//use my middelwares
app.use(express.static("public"))

app.use('/Menu',addController)
app.use('/MenuOrder',listController)
app.use('',loginController)

//connect to DB
mongoose.connect("mongodb://127.0.0.1:27017/healthyRestaurant");

// require for model files
var files_arr=fs.readdirSync(__dirname+"/models")
files_arr.forEach(function(file){
  require(__dirname+"/models/"+file);
});



app.get("",function (req,resp) {
  console.log("this is get request");  
  // resp.send("this is response from '/'")
  resp.render("./login/login"); // later
  // resp.render("./Menu/listMeals")

})
 

//listen 
app.listen(8070,function(){
    console.log("server on port 8070");
    
})