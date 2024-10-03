
const mongoose = require("mongoose");
const connection = mongoose.createConnection("mongodb://localhost:27017/Users").on("open", ()=>{
    console.log("Database Connected");
});

module.exports = connection;

