const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

    sMovie = new Schema({
        director_id:Schema.Types.ObjectId,
        title: {
            type:String,
            required:true
        },
        category : String,
        country: String,
        year:Number,
        imdb_score:Number,
        createdAt: {
            type:Date,
            default:Date.now
        }        
    });

    module.exports= mongoose.model("movie",sMovie);