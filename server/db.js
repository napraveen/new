const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Your email address is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Your username is required'],
  },
  password: {
    type: String,
    required: [true, 'Your password is required'],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const publicPosts = [
  {
    title: 'Free Tips on Development',
    content: 'These are some tips',
  },
];

const privatePosts = [
  {
    title: 'Paid Tips on Development',
    content: 'These are some tips',
  },
];

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  year: {
    type: String,
    required: false,
  },
  department: {
    type: String,
    required: false,
  },
  section: {
    type: String,
    required: false,
  },
  departmentId: {
    type: String,
    required: false,
  },
  rollNo: {
    type: String,
    required: false,
  },
  registerNo: {
    type: String,
    required: false,
  },
  mobileNo: {
    type: String,
    required: false,
  },
  presentCount: {
    type: Number,
    default: 0,
  },
  absentCount: {
    type: Number,
    default: 0,
  },
  medicalLeave: {
    type: Number,
    default: 0,
  },
  previledgeLeave: {
    type: Number,
    default: 0,
  },
  presentDates: [
    {
      type: String,
    },
  ],
  absentDates: [
    {
      type: String,
    },
  ],
});

const submittedDatesSchema = mongoose.Schema({
  departmentId: {
    type: String,
    required: false,
  },
  dates: [
    {
      type: String,
    },
  ],
});
const submittedDates = mongoose.model('SubmittedDates', submittedDatesSchema);
// submittedDates.create({
//   departmentId: 'ECEB',
// });
const User = mongoose.model('User', userSchema);
const Student = mongoose.model('Student', studentSchema);
module.exports = { User, publicPosts, privatePosts, Student, submittedDates };
