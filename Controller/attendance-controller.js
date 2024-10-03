const {CoursesAttendanceModel} = require("../Models/attendance-model");
const {StudentModel} = require("../Models/users-model");
const {ClassSchedulesModel, QRDataModel} = require("../Models/data-model");

exports.markAttendance = async (req, res) => {
    try {
        const { studentId, status,  qrData } = req.body;

        const scheduleId = qrData.sessionId;
        const courseId = qrData.courseId;
        const qrId = qrData.id;

        let qrInstance = await QRDataModel.findOne({ sessionId: qrData.sessionId });

        if (qrInstance) {
            if(qrInstance.qrCodeId != qrId){
                return res.status(400).json({ message: "Invalid QR Code. QR Code Expired" });
            }
        } else {
            return res.status(400).json({ message: "Invalid QR Code. QR Code Expired"});
        }

        const schedule = await ClassSchedulesModel.findById(scheduleId);
        if (!schedule) {
            return res.status(404).json({ message: "Scheduled class not found" });
        }

        const student = await StudentModel.findOne({
            studentId: studentId,
            $or: [
                { courses: courseId },
                { additionalCourses: courseId }
            ]
        });

        if (!student) {
            return res.status(400).json({ message: "Student not enrolled in this course" });
        }

        const attendance = await CoursesAttendanceModel.findOneAndUpdate(
            { studentId, courseId, scheduleId }, 
            { status: status || 'Absent' },  
            { upsert: true, new: true } 
        );

        res.status(200).json({
            message: "Attendance marked successfully",
            attendance
        });

    } catch (error) {
        console.error("Error marking attendance: ", error);
        res.status(500).json({ message: "Server error", error });
    }
};

