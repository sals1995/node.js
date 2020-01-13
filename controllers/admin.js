var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var bodyParser= require("body-parser")

var middlewareBodyParser = bodyParser.urlencoded({ extended: true })

router.post("/login", middlewareBodyParser, function (req, respo) {
    console.log("someone try to login")
    var userModel = mongoose.model('admin')
    var user = new userModel();
    user.Uname = req.body.name
    user.password = req.body.password
    
    mongoose.model('admin').find({"name":req.body.name,"password":req.body.password},(function (err, data) {
        // console.log(date)
        if (data.length===0){
            respo.send("Please enter correct login data")
        }
        else{
            respo.redirect('/Menu/listMeals');
            console.log(data);
        }
    }))

})

module.exports = router;
