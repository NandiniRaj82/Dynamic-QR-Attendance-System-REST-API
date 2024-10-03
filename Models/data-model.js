const { json } = require("express");
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
    }
});

const qrSessionData = new mongoose.Schema({
    qrCodeId: {
        type: String,
        required: true
    },
    sessionId: {
        type: String,
        required: true,
        unique: true
    },
    classData: {
        type: mongoose.Schema.Types.Mixed
    }
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
        required: false,
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
        required: true,
        default:  Date.now()
    },
    checkOut: {
        type: Date,
        required: false,
        default:  Date.now()
    },
});

const CoursesModel=  mongoose.model('Courses', courseDetails);
const LabDataModel= mongoose.model('LabData', labTiming);
const LibraryModel= mongoose.model('LibraryData', libraryTiming);
const QRDataModel= mongoose.model('QRSessionData', qrSessionData);

module.exports = {
    CoursesModel,
    LabDataModel,
    LibraryModel,
    QRDataModel
}