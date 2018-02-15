const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

sMovie = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur'], //burada tek tırnak ve yan tırnak kullanman lazım çalışmıyor
        maxlength: [15, '`{PATH}` alanı (`{VALUE}`), ({MAXLENGTH}) karakterden küçük olmalıdır'],
        minlength: 3
    },
    category: {
        type: String,
        maxlength: 30,
        minlength: 1
    },
    country: {
        type: String,
        maxlength: 30,
        minlength: 1
    },
    year: { 
        type: Number, 
        max: 2040,
        min: 1800 
    },
    imdb_score:{
        type:Number,
        max:10,
        min:0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("movie", sMovie);