const {Schema,model} = require("mongoose")

const exerciseSchema = Schema({
  username: {
    type:String,required:true
  }, description: {
    type:String,required:true
  }, duration: {
    type:Number,required:true
  }, date: {
    type:String,required:true
  }
})

module.exports = model("Exercise",exerciseSchema)