const {CoursesModel, LabDataModel, LibraryModel} = require("../Models/data-model");
const {StudentModel,ProfessorsModel, OtherUsersModel} = require("../Models/users-model");


exports.addCourse = async(req,res) => {
    try {
        const newCourse = new CoursesModel(req.body);
        await newCourse.save();
        res.status(201).send("Course Saved successfully!");
    } catch (error) {
            res.status(400).send("Error saving course: " + error.message);
    }
}

exports.getStudentCourses = async (req, res) => {
    try {
      const { studentId } = req.body;
      const student = await StudentModel.findOne({studentId: studentId}).populate({
        path: 'courses',
        model: CoursesModel,
        populate: {
          path: 'instructedCourses',
          model: 'ProfessorsModel',
          select: 'fullName'
        }
      }).populate({
        path: 'additionalCourses',
        model: CoursesModel,
        populate: {
          path: 'instructedCourses',
          model: 'ProfessorsModel',
          select: 'fullName'
        }
      });

      const courses = [...student.courses, ...student.additionalCourses];
      res.status(200).send(courses);
    } catch (error) {
      res.status(400).send("Error fetching courses: " + error.message);
    }
  }

exports.addClass = async(req,res) => {
    try {
        const newCourse = new CoursesModel(req.body);
        await newCourse.save();
        res.status(201).send("Course Saved successfully!");
    } catch (error) {
        res.status(400).send("Error saving course: " + error.message);
    }
}

exports.LabActivity = async(req,res) => {
    try {
        const newLabTiming = new LabDataModel(req.body);
        await newLabTiming.save();
        res.status(201).send("Lab timing recorded successfully!");
    } catch (error) {
        res.status(400).send("Error recording lab timing: " + error.message);
    }
}

exports.LibraryActivity = async(req,res)=>{
    try {
        const newLibraryTiming = new LibraryModel(req.body);
        await newLibraryTiming.save();
        res.status(201).send("Library timing recorded successfully!");
    } catch (error) {
        res.status(400).send("Error recording library timing: " + error.message);
    }
}