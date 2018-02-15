const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

sDirector = new Schema({
    name: {
        type: String,
        maxlength: 60,
        minlength: 2
    },
    surname: {
        type: String,
        maxlength: 60,
        minlength: 2
    },
    bio: {
        type: String,
        maxlength: 1600,
        minlength: 60
    },
    createdAt: {
        type: String,
        default: Date.now
    }
});

module.exports = mongoose.model("director", sDirector);