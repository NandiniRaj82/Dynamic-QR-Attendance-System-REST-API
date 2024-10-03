const db = require("../Config/db.js")
const mongoose = require("mongoose");

const courseDetails = new mongoose.Schema({
    courseId: {
        type: String,
        required: true,
        unique: true
    },
    courseName: {
        type: String,
        required: true,
        unique: true
    },
});

const labTiming = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true,
        unique: true
    },
    checkIn: {
        type: Date,
        required: true,
        default:  Date.now()
    },
    checkOut: {
        type: Date,
        required: true,
        default:  Date.now()
    },
});

const libraryTiming = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true,
        unique: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
})

const CoursesModel=  mongoose.model('Courses', courseDetails);
const LabDataModel= mongoose.model('LabData', labTiming);
const LibraryModel= mongoose.model('LibraryModel', libraryTiming);

module.exports = {
    CoursesModel,
    LabDataModel,
    LibraryModel
}