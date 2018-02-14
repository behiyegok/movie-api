const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

    sDirector = new Schema({
        name:String,
        surname:String,
        bio:String,
        createdAt:{
            type:String,
            default:Date.now
        }
    });

    module.exports= mongoose.model("director",sDirector);