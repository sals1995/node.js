var mongoose=require("mongoose")
// register model
var Schema=mongoose.Schema
var admins=new Schema({
  password:Number,
  name:String
})
// ORM
mongoose.model("admin",admins)