var mongoose=require("mongoose")
var Schema=mongoose.Schema
var order=new Schema({
  note:String,
  ordertime:{type:Date,default:Date.now()},
  meals:[{
    type : mongoose.Schema.Types.ObjectId,
    ref : "meal",
    required : true
  }]


})
mongoose.model("order",order)