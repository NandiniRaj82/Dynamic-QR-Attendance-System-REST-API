const uuid = require('uuid');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {StudentModel,ProfessorsModel, OtherUsersModel} = require("../Models/users-model");
const {CoursesModel,ClassSchedulesModel , LabDataModel, LibraryModel, QRDataModel} = require("../Models/data-model");
const {CoursesAttendanceModel} = require("../Models/attendance-model");


const generateToken = (user) => {
  const token = jwt.sign({userId: user._id, fullName: user.fullName, email: user.email}, "SWE_SECRET_KEY", { expiresIn: '28d' });
  return token;
};

exports.generateQRCode = async(req, res) => {
  try {
      const { sessionId, classData } = req.body;
      const uniqueId = uuid.v4();

      const classStartTime = new Date(classData.startTime); 
      const classDurationInMs = classData.duration * 60 * 1000;  
      const extraTimeInMs = 15 * 60 * 1000; 
      const currentTime = new Date();

      const sessionEndTime = new Date(classStartTime.getTime() + classDurationInMs + extraTimeInMs);

      if (currentTime > sessionEndTime) {
          return res.status(400).send("The class has ended, QR codes can no longer be generated.");
      }

      let existingSession = await QRDataModel.findOne({ sessionId: sessionId });

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

      const QR_Code_Generation_URL = 'http://192.168.6.121:8000/generateQrCode';
      const postData = {
          "id": uniqueId,
          "sessionId": sessionId,
          "courseId":  classData.courseId,
          "className": classData.className,
          "duration": classData.duration,
          "startTime": classData.startTime,
          "timestamp": Date.now().toString()
      };

      const response = await axios.post(QR_Code_Generation_URL, postData, {
          responseType: 'arraybuffer', 
      });

      res.set('Content-Type', 'image/png');
      res.set('Content-Disposition', 'inline; filename="qr.png"');
      res.send(Buffer.from(response.data, 'binary'));

  } catch (error) {
      console.error('Error generating QR code:', error.message);
      res.status(400).send("Error generating QR code: " + error.message);
  }
};

exports.studentSignup = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await StudentModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'Email already exists' });
    }

    const newStudent = new StudentModel(req.body);
    await newStudent.save();

    res.status(201).send({ message: 'Student account created successfully' });
  } catch (error) {
    console.error('Error creating student account:', error.message);
    res.status(500).send({ message: 'Internal server error' });
  }
};

exports.professorSignup = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await ProfessorsModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'Email already exists' });
    }

    const newProfessor = new ProfessorsModel(req.body);
    await newProfessor.save();

    res.status(201).send({ message: 'Professor account created successfully' });
  } catch (error) {
    console.error('Error creating professor account:', error.message);
    res.status(500).send({ message: 'Internal server error' });
  }
};

exports.otherUserSignup = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await OtherUsersModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'Email already exists' });
    }

    const newUser = new OtherUsersModel(req.body);
    await newUser.save();

    res.status(201).send({ message: 'Other user account created successfully' });
  } catch (error) {
    console.error('Error creating other user account:', error.message);
    res.status(500).send({ message: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).send({ message: 'Email, password, and role are required' });
    }

    let user;

    switch (role) {
      case 'student':
        user = await StudentModel.findOne({ email });
        break;
      case 'professor':
        user = await ProfessorsModel.findOne({ email });
        break;
      case 'other':
        user = await OtherUsersModel.findOne({ email });
        break;
      default:
        return res.status(400).send({ message: 'Invalid role' });
    }

    if (!user) {
      return res.status(401).send({ message: 'Invalid User' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).send({ message: 'Invalid password' });
    }

    const token = generateToken(user);
    res.status(200).send({ token, message: `${role.charAt(0).toUpperCase() + role.slice(1)} logged in successfully` });
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).send({ message: 'Internal server error' });
  }
};

exports.addCourse = async(req,res) => {
  try {
      const newCourse = new CoursesModel(req.body);
      await newCourse.save();
      res.status(201).send("Course Saved successfully!");
    } catch (error) {
      res.status(400).send("Error saving course: " + error.message);
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