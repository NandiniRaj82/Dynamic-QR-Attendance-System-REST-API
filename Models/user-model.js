const db = require("../Config/db.js")
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    username: { type: String, required: true },
    studentId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    mobileNo: { type: String, required: true },
    password: { type: String, required: true },
});

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    clgemail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

module.exports = {
    studentModel: mongoose.model("Student", studentSchema),
    adminModel: mongoose.model("Admin", adminSchema)
}