const mongoose = require("mongoose");

const courseAttendanceSchema = new mongoose.Schema({
    studentId: {
        type: String,
        ref: 'Students',
        required: true
    },
    courseId: {
        type: Number,
        ref: 'Courses', 
        required: true
    },
    scheduleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClassSchedules',
        required: true
    },
    status: {
        type: String,
        enum: ['Present', 'Absent', 'Late'],
        default: 'Absent'
    }
});

const CoursesAttendanceModel= mongoose.model('Courses Attendance', courseAttendanceSchema); 

module.exports = {
    CoursesAttendanceModel
}