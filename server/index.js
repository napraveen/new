const express = require('express');

const app = express();
const { User } = require('./db');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const data = require('./data');
const { Student, submittedDates } = require('./db');
const { use } = require('./routes/auth');
app.use(express.json());
// const saveStudentsToDatabase = require('./saveStudentsToDatabase');
// saveStudentsToDatabase();
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);
app.use(express.json());
app.use(cookieParser());
mongoose
  .connect(
    'mongodb+srv://napraveen:praveen@praveencluster.ihcxeia.mongodb.net/attendance'
  )
  .then(() => console.log('MongoDB is  connected successfully'))
  .catch((err) => console.error(err));

app.use('/auth', require('./routes/auth'));
app.use('/posts', require('./routes/posts'));
app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/api/user/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    res.json(user);
    console.log(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/students', async (req, res) => {
  try {
    const data = await Student.find(); // Fetch data from MongoDB
    res.json(data); // Send fetched data as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post('/api/updateAttendance/:departmentId', async (req, res) => {
  try {
    const { presentStudents, absentStudents } = req.body;
    const departmentId = req.params.departmentId;
    const newDate = new Date().toISOString().slice(0, 10);

    const submittedDepartment = await submittedDates.findOne({
      departmentId: 'ECEB',
    });
    if (!submittedDepartment.dates.includes(newDate)) {
      for (const student of presentStudents) {
        let studentId = student._id;
        await Student.findByIdAndUpdate(studentId, {
          $inc: { presentCount: 1 },
        });
        await Student.findByIdAndUpdate(studentId, {
          $push: { presentDates: newDate },
        });
      }
      for (const student of absentStudents) {
        let studentId = student._id;
        await Student.findByIdAndUpdate(studentId, {
          $inc: { absentCount: 1 },
        });
        await Student.findByIdAndUpdate(studentId, {
          $push: { absentDates: newDate },
        });
      }
      res.status(200).json({ message: 'Attendance updated successfully' });

      await submittedDates.findOneAndUpdate(
        { departmentId: departmentId },
        { $push: { dates: newDate } }
        // { upsert: true }
      );
    } else {
      res.json({ message: 'Already Submitted' });
    }
  } catch (error) {
    console.error('Error updating attendance:', error);
    res.status(500).json({ error: 'Failed to update attendance' });
  }
});

app.get('/api/submissionstatus/:departmentId', async (req, res) => {
  try {
    const departmentId = req.params.departmentId;
    const newDate = new Date().toISOString().slice(0, 10);

    // Assuming submittedDates is your MongoDB collection
    const submittedDepartment = await submittedDates.findOne({
      departmentId: departmentId, // Use the received departmentId in the query
    });

    if (submittedDepartment && submittedDepartment.dates.includes(newDate)) {
      res.status(200).json({ message: 'true' });
    } else {
      res.status(200).json({ message: 'false' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    console.error('Error fetching submission status:', error);
  }
});

app.post('/api/addstudents', async (req, res) => {
  try {
    const {
      name,
      year,
      department,
      section,
      departmentId,
      rollNo,
      registerNo,
      mobileNo,
    } = req.body; // Assuming you have middleware to parse JSON bodies

    // Create a new student instance
    const student = new Student({
      name,
      year,
      department,
      section,
      departmentId,
      rollNo,
      registerNo,
      mobileNo,
    });

    // Save the student to the database
    await student.save();

    res.status(201).json({ message: 'Student added successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/findstudent/:registerno', async (req, res) => {
  const registerNo = req.params.registerno;
  const student = await Student.findOne({ registerNo: registerNo });
  res.status(200).json({ found: student });
});
app.listen(4000, () => {
  console.log('Server running on 4000');
});
