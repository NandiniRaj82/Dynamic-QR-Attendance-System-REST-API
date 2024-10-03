const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseId: {
        type: Number,
        required: true,
        unique: true
    },
    batch: {
        type: Number,
    },
    courseCode: {
        type: String,
        required: true,
    },
    courseName: {
        type: String,
        required: true,
        unique: true
    }
});

const classScheduleSchema = new mongoose.Schema({
    courseId: {
        type: Number,
        ref:  "Course",
        required: true
    },
    scheduledDate: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        default: 60
    },
    classTopic: {
        type: String,
        default: "Topic Not Specified"
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

const CoursesModel=  mongoose.model('Courses', courseSchema);
const ClassSchedulesModel=  mongoose.model('Class Schedules', classScheduleSchema);
const QRDataModel= mongoose.model('QR Session Data', qrSessionData);

const LabDataModel= mongoose.model('Lab Data', labTiming); 
const LibraryModel= mongoose.model('Library Data', libraryTiming); 

module.exports = {
    CoursesModel,
    ClassSchedulesModel,
    QRDataModel,
    LabDataModel,
    LibraryModel
}