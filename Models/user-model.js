const db = require("../Config/db.js")
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    username:{type: String,required:true},
    studentId:{type: String,required:true,unique:true},
    emial:{type: String,required:true,unique:true},
    moblieNo:{type: String,required:true,unique:true},
    UserId:{type: String,required:true,unique:true},
    password:{type: String,required:true,unique:true},
});

const adminSchema = new mongoose.Schema({
    name:{type: String,required:true},
    clgemail:{type: String,required:true,unique:true},
    password:{type: String,required:true,unique:true},
});

module.export = {
    studentSchema,
    adminSchema
}