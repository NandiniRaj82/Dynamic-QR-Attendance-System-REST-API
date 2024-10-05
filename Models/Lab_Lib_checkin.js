const { LabDataModel, LibraryModel, QRDataModel } = require("../Models/data-model");
const { StudentModel, ProfessorsModel, OtherUsersModel } = require("../Models/users-model");

exports.checkInOut = async (req, res) => {
    try {
        const { userId, facilityType, action, qrData } = req.body;

        const sessionId = qrData.sessionId;
        const facilityId = qrData.facilityId;
        const qrId = qrData.id;

        let qrInstance = await QRDataModel.findOne({ sessionId: qrData.sessionId });

        if (qrInstance) {
            if(qrInstance.qrCodeId !== qrId) {
                return res.status(400).json({ message: "Invalid QR Code. QR Code Expired" });
            }
        } else {
            return res.status(400).json({ message: "Invalid QR Code. QR Code Expired"});
        }

        const FacilityModel = facilityType === 'lab' ? LabDataModel : LibraryModel;

        let user = await StudentModel.findOne({ studentId: userId });
        if (!user) {
            user = await ProfessorsModel.findOne({ email: userId });
        }
        if (!user) {
            user = await OtherUsersModel.findOne({ email: userId });
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (facilityType === 'lab') {
            if (user.model === OtherUsersModel && !['Lab 1', 'Lab 2', 'Lab 3', 'Lab 4'].includes(user.department.name)) {
                return res.status(403).json({ message: "User not authorized to use lab facilities" });
            }
            if (!['Lab 1', 'Lab 2', 'Lab 3', 'Lab 4'].includes(facilityId)) {
                return res.status(400).json({ message: "Invalid lab" });
            }
        }

        if (facilityType === 'library' && user.model === OtherUsersModel && user.department.name !== 'Library') {
            return res.status(403).json({ message: "User not authorized to use library facilities" });
        }

        let record;

        if (action === 'checkIn') {
            record = new FacilityModel({
                name: user.fullName,
                studentId: user.studentId || user.email,
                checkIn: new Date(),
                ...(facilityType === 'lab' && { labName: facilityId })
            });
            await record.save();
        } else if (action === 'checkOut') {
            const query = {
                studentId: user.studentId || user.email,
                checkOut: null
            };
            if (facilityType === 'lab') {
                query.labName = facilityId;
            }
            record = await FacilityModel.findOne(query).sort({ checkIn: -1 });

            if (!record) {
                return res.status(400).json({ message: "No active check-in found" });
            }

            record.checkOut = new Date();
            await record.save();
        } else {
            return res.status(400).json({ message: "Invalid action. Use 'checkIn' or 'checkOut'" });
        }

        res.status(200).json({
            message: `${action} successful`,
            record
        });

    } catch (error) {
        console.error(`Error during ${req.body.action}: `, error);
        res.status(500).json({ message: "Server error", error });
    }
};