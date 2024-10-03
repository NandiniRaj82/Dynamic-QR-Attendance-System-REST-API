const router = require("express").Router();
const controller = require("./Controller/controllers.js");

router.post("/api/v1/users/add-student", controller.studentSignup);
router.post("/api/v1/users/add-professor",controller.professorSignup);
router.post("/api/v1/users/add-other-user",controller.otherUserSignup);

router.post("/api/v1/users/login",controller.login);
// router.post("/api/v1/course/add-course",controller.);
router.post("/api/v1/lab/add-lab-timing",controller.LabActivity);
router.post("/api/v1/library/add-library-timing",controller.LibraryActivity);
router.post("/api/v1/generateQRCode",controller.generateQRCode);

module.exports = router;