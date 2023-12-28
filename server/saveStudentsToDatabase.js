const { Student } = require('./db');

const data = {
  students: [
    {
      name: 'ABC D',
      department: 'ECE',
      section: 'B',
      rollno: ' 21AB123',
      registerno: '1234567890',
      mobileno: '1234567890',
      year: '3',
    },
    {
      name: 'EFG H',
      department: 'ECE',
      section: 'B',
      rollno: ' 21CD123',
      registerno: '1234567891',
      mobileno: '1234567891',
      year: '3',
    },
    {
      name: 'IJK L',
      department: 'ECE',
      section: 'B',
      rollno: ' 21EF123',
      registerno: '1234567892',
      mobileno: '1234567892',
      year: '3',
    },
    {
      name: 'MNO P',
      department: 'ECE',
      section: 'B',
      rollno: '21IJ123',
      registerno: '1234567893',
      mobileno: '1234567893',
      year: '3',
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
