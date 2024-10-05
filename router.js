const router = require("express").Router();
const usersController = require("./Controller/user-controller.js");
const AttendanceController = require("./Controller/attendance-controller");
const UtilsController = require("./Controller/utils-controller");

router.post("/api/v1/users/add-student", usersController.studentSignup);
router.post("/api/v1/users/add-professor",usersController.professorSignup);
router.post("/api/v1/users/add-other-user",usersController.otherUserSignup);
router.post("/api/v1/users/login",usersController.login);

router.post("/api/v1/generateQRCode",AttendanceController.generateQRCode);
router.post("/api/v1/students/markAttendance",AttendanceController.markAttendance);
router.post("/api/v1/students/myCourses",UtilsController.getStudentCourses);

router.post("/api/v1/course/add-course",UtilsController.addCourse);
router.post("/api/v1/course/add-class",UtilsController.addClass);

router.post("/api/v1/lab/add-lab-timing",UtilsController.LabActivity);
router.post("/api/v1/library/add-library-timing",UtilsController.LibraryActivity);

module.exports = router;