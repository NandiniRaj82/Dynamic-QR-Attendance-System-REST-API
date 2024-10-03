const router = require("express").Router();
const usersController = require("./Controller/user-controller.js");
const AttendanceController = require("./Controller/attendance-controller");

router.post("/api/v1/users/add-student", usersController.studentSignup);
router.post("/api/v1/users/add-professor",usersController.professorSignup);
router.post("/api/v1/users/add-other-user",usersController.otherUserSignup);
router.post("/api/v1/users/login",usersController.login);

router.post("/api/v1/generateQRCode",usersController.generateQRCode);
router.post("/api/v1/students/markAttendance",AttendanceController.markAttendance);

router.post("/api/v1/course/add-course",usersController.addCourse);
router.post("/api/v1/course/add-class",usersController.addClass);

router.post("/api/v1/lab/add-lab-timing",usersController.LabActivity);
router.post("/api/v1/library/add-library-timing",usersController.LibraryActivity);

module.exports = router;