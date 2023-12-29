const { Student } = require('./db');

const data = {
  students: [
    {
      name: 'ABC D',
      department: 'ECE',
      section: 'B',
      rollNo: ' 21AB123',
      registerNo: '1234567890',
      mobileNo: '1234567890',
      year: '3',
      departmentId: 'ECEB',
    },
    {
      name: 'EFG H',
      department: 'ECE',
      section: 'B',
      rollNo: ' 21CD123',
      registerNo: '1234567891',
      mobileNo: '1234567891',
      year: '3',
      departmentId: 'ECEB',
    },
    {
      name: 'IJK L',
      department: 'ECE',
      section: 'B',
      rollNo: ' 21EF123',
      registerNo: '1234567892',
      mobileNo: '1234567892',
      year: '3',
      departmentId: 'ECEB',
    },
    {
      name: 'MNO P',
      department: 'ECE',
      section: 'B',
      rollNo: '21IJ123',
      registerNo: '1234567893',
      mobileNo: '1234567893',
      year: '3',
      departmentId: 'ECEB',
    },
  ],
};

const saveStudentsToDatabase = async () => {
  try {
    for (const studentData of data.students) {
      const student = new Student(studentData);
      await student.save();
    }
    console.log('Students saved successfully.');
  } catch (error) {
    console.error('Error saving Students:', error);
  }
};

module.exports = saveStudentsToDatabase;
