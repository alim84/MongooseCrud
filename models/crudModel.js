const mongoose = require("mongoose");

let crudSchema = new mongoose.Schema({
    name:{
        type:String,
      
    }
})

module.exports=mongoose.model("crud", crudSchema)