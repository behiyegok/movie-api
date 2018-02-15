const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

sUser = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 5
    },
});

module.exports = mongoose.model("user", sUser);