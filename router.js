const router = require("express").Router();
const controller = require("./Controller/controllers.js");

router.post("/api/v1/student/add-student", controller.StudentSignup)
router.post("api/v1/admin/add-admin",controller.AdminSignup)
router.post("api/v1/course/add-course",controller.CourseDetails)
router.post("api/v1/lab/add-lab-timing",controller.LabTiming)
router.post("api/v1/library/add-library-timing",controller.LibraryTiming)