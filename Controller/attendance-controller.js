const {CoursesAttendanceModel} = require("../Models/attendance-model");
const {StudentModel} = require("../Models/users-model");
const {ClassSchedulesModel, QRDataModel} = require("../Models/data-model");

const uuid = require('uuid');
const axios = require('axios');

exports.markAttendance = async (req, res) => {
    try {
        const { studentId, status } = req.body;
        let {qrData} = req.body;
        qrData = JSON.parse(qrData);
        
        const scheduleId = qrData.sessionId;
        const qrId = qrData.id;
        console.log(qrData.sessionId);

        let qrInstance = await QRDataModel.findOne({ sessionId: qrData.sessionId });

        if (qrInstance) {
            if(qrInstance.qrCodeId != qrId){
                return res.status(400).json({ message: "Invalid QR Code. QR Code Expired" });
            }
        } else {
            return res.status(400).json({ message: "Invalid QR Code. QR Code Expired."});
        }

        const schedule = await ClassSchedulesModel.findById(scheduleId);
        if (!schedule) {
            return res.status(404).json({ message: "Scheduled class not found" });
        }

        console.log(schedule.courseId);
        const courseId = schedule.courseId;

        const student = await StudentModel.findOne({
            studentId: studentId,
            $or: [
                { courses: schedule.courseId },
                { additionalCourses: schedule.courseId }
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

exports.generateQRCode = async(req, res) => {
    try {
        const { sessionId } = req.body;
        const uniqueId = uuid.v4();

        const classData = await ClassSchedulesModel.findById(sessionId);
        if (!classData) {
            return res.status(404).json({ message: "Scheduled class not found" });
        }

        const classStartTime = classData.scheduledDate;
        const currentTime = new Date();
  
        const classDateString = classStartTime.toISOString().split('T')[0];
        const currentDateString = currentTime.toISOString().split('T')[0];

        if (classDateString !== currentDateString) {
            return res.status(400).send("QR codes can only be generated for classes scheduled today.");
        }
  
        const QR_Code_Generation_URL = 'http://localhost:8000/generateQrCode';
        const postData = {
            "id": uniqueId,
            "sessionId": sessionId,
            "timestamp": Date.now().toString()
        };
  
        const response = await axios.post(QR_Code_Generation_URL, postData, {
            responseType: 'arraybuffer', 
        });

        let existingSession = await QRDataModel.findOne({ sessionId: sessionId });
        console.log(uniqueId);
  
        if (existingSession) {
            existingSession.qrCodeId = uniqueId;
            await existingSession.save();
        } else {
            const qrSessiondata = {
                qrCodeId: uniqueId,
                sessionId: sessionId,
                classData: classData
            };
  
            const qrData = new QRDataModel(qrSessiondata);
            await qrData.save();
        }
  
        res.set('Content-Type', 'image/png');
        res.set('Content-Disposition', 'inline; filename="qr.png"');
        res.send(Buffer.from(response.data, 'binary'));
  
    } catch (error) {
        console.error('Error generating QR code:', error.message);
        res.status(400).send("Error generating QR code: " + error.message);
    }
};
