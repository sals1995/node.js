var mongoose=require("mongoose")
var Schema=mongoose.Schema
var meal=new Schema({
  name:String,
  price:Number,
  description:String,
  img:String,
  note:String
 
})
mongoose.model("meal",meal)
