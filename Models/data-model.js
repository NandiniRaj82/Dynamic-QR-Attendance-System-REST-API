const db = require("../Config/db.js")
const mongoose = require("mongoose");

const courseDetails = new mongoose.Schema({
    courseid:{type: String,required:true,unique:true},
    coursename:{type: String,required:true,unique:true},
});

const labTiming = new mongoose.Schema({
    name:{type: String,required:true},
    studentId:{type: String,required:true,unique:true},
    checkin:{type: Date, required: true},
    checkout:{type: Date, required: true},
});

const libraryTiming = new mongoose.Schema({
    name:{type: String,required:true},
    studentId:{type: String,required:true,unique:true},
    checkin:{type: Date, required: true},
    checkout:{type: Date, required: true},
})

module.exports = {
    courseDetails,
    labTiming,
    libraryTiming
}