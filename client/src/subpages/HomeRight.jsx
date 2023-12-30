import React from 'react';

const HomeRight = ({
  department,
  handleSubmit,
  handleCheckboxChange,
  studentAttendance,
}) => {
  let sno = 1;
  return (
    <div className="home-right">
      <div className="home-right-header">
        <h1>
          {department[0].department} {department[0].section} Class Attendance
        </h1>
        <button className="home-submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <table>
        <tr>
          <th>S.No</th>
          <th>Name</th>
          <th>Department</th>
          <th>Section</th>
          <th>Roll No</th>
          <th>Present?</th>
          <th>On Duty</th>
        </tr>

        {department.map((item) => (
          <tr key={item._id}>
            <td>{sno++}</td>
            <td>{item.name}</td>
            <td>{item.department}</td>
            <td>{item.section}</td>
            <td>{item.rollNo}</td>
            <td>
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(item._id)}
                checked={studentAttendance[item._id] || false}
              />
            </td>
            <td>
              <input type="checkbox" />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default HomeRight;
