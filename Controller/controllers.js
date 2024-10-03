
const {User,admin} = require("../Models/user-model")


exports.StudentSignup = async(req,res)=>{
    try {
        const newUser = new User(req.body);
        console.log(req.body);
        await newUser.save();
        res.status(201).send("User created successfully!");
      } catch (error) {
        res.status(400).send("Error creating user: " + error.message);
      }
}

exports.AdminSignup = async(req,res)=>{
    try {
        const newAdmin = new adminModel(req.body);
        await newAdmin.save();
        res.status(201).send("Admin created successfully!");
      } catch (error) {
        res.status(400).send("Error creating admin: " + error.message);
      }
}

exports.CourseDetails = async(req,res)=>{
    try {
        const newCourse = new Course(req.body);
        await newCourse.save();
        res.status(201).send("Course created successfully!");
      } catch (error) {
        res.status(400).send("Error creating course: " + error.message);
      }
}

exports.LabTiming = async(req,res)=>{
    try {
        const newLabTiming = new Lab(req.body);
        await newLabTiming.save();
        res.status(201).send("Lab timing recorded successfully!");
      } catch (error) {
        res.status(400).send("Error recording lab timing: " + error.message);
      }
}

exports.LibraryTiming = async(req,res)=>{
    try {
        const newLibraryTiming = new Library(req.body);
        await newLibraryTiming.save();
        res.status(201).send("Library timing recorded successfully!");
      } catch (error) {
        res.status(400).send("Error recording library timing: " + error.message);
      }
}