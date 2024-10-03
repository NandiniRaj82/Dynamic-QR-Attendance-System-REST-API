const mongoose = require("mongoose");

const PORT = 8000;

const userschema = new mongoose.Schema({
    username:{type: String,required:true},
    studentId:{type: String,required:true,unique:true},
    emial:{type: String,required:true,unique:true},
    moblieNo:{type: String,required:true,unique:true},
    UserId:{type: String,required:true,unique:true},
    password:{type: String,required:true,unique:true},
});

const adminschema = new mongoose.Schema({
    name:{type: String,required:true},
    clgemail:{type: String,required:true,unique:true},
    password:{type: String,required:true,unique:true},
});

const coursedetails = new mongoose.Schema({
    courseid:{type: String,required:true,unique:true},
    coursename:{type: String,required:true,unique:true},
});

const labtiming = new mongoose.Schema({
    name:{type: String,required:true},
    studentId:{type: String,required:true,unique:true},
    checkin:{type: Date, required: true},
    checkout:{type: Date, required: true},
});

const librarytiming = new mongoose.Schema({
    name:{type: String,required:true},
    studentId:{type: String,required:true,unique:true},
    checkin:{type: Date, required: true},
    checkout:{type: Date, required: true},
})

const User = mongoose.model("user",userschema);
const admin = mongoose.model("admin",adminschema);
const course = mongoose.model("course",coursedetails);
const lab = mongoose.model("lab",labtiming);
const library = mongoose.model("library",librarytiming);

app.post("/add-", async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).send("User created successfully!");
    } catch (error) {
      res.status(400).send("Error creating user: " + error.message);
    }
  });
  
  app.post("/add-admin", async (req, res) => {
    try {
      const newAdmin = new Admin(req.body);
      await newAdmin.save();
      res.status(201).send("Admin created successfully!");
    } catch (error) {
      res.status(400).send("Error creating admin: " + error.message);
    }
  });
  
  app.post("/add-course", async (req, res) => {
    try {
      const newCourse = new Course(req.body);
      await newCourse.save();
      res.status(201).send("Course created successfully!");
    } catch (error) {
      res.status(400).send("Error creating course: " + error.message);
    }
  });
  
  app.post("/add-lab-timing", async (req, res) => {
    try {
      const newLabTiming = new Lab(req.body);
      await newLabTiming.save();
      res.status(201).send("Lab timing recorded successfully!");
    } catch (error) {
      res.status(400).send("Error recording lab timing: " + error.message);
    }
  });
  
  app.post("/add-library-timing", async (req, res) => {
    try {
      const newLibraryTiming = new Library(req.body);
      await newLibraryTiming.save();
      res.status(201).send("Library timing recorded successfully!");
    } catch (error) {
      res.status(400).send("Error recording library timing: " + error.message);
    }
  });
  

