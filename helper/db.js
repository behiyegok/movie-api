const mongoose = require("mongoose");

module.exports = () => {
    mongoose.connect("mongodb://behiyegok:bhy.0201@ds229388.mlab.com:29388/movie-api"
    ).then(()=>{
        console.log("mLab : Succes - DB Connected");
    }).catch(()=>{
        console.log("mLab : Failed - DB disConnect")
    })
};