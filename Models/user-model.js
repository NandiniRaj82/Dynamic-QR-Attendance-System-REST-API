const db = require("../Config/db.js")
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobileNo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    clgemail: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

const StudentModel = mongoose.model("User", studentSchema);
const AdminModel = mongoose.model("Admin", adminSchema);

module.exports = {
    StudentModel,
    AdminModel
};