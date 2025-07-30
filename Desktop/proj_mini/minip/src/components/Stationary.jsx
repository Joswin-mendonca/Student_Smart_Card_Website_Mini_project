import React, { useState } from 'react';
import axios from 'axios'; // For making API calls

function Stationary() {
  const [option, setOption] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [studentDue, setStudentDue] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Roll Number input change
  const handleRollChange = (e) => {
    setRollNumber(e.target.value);
  };

  // Handle option change
  const handleOptionChange = (e) => {
    setOption(e.target.value);
    setStudentData(null);  // Reset student data and error message
    setStudentDue(null);
    setErrorMessage('');
  };

  // Function to fetch student data and balance
  const fetchStudentBalance = () => {
    axios
      .get(`http://localhost:5000/get-student-details/${rollNumber}`) // Assuming this route returns student details
      .then((response) => {
        const student = response.data;
        setStudentData(student);
        setStudentDue(null);  // Clear any due data
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage('Invalid student');
        setStudentData(null);
        setStudentDue(null);
      });
  };

  // Function to check student dues
  const checkStudentDues = () => {
    axios
      .get(`http://localhost:5000/get-student-due/${rollNumber}`) // Assuming you have this endpoint
      .then((response) => {
        const due = response.data.due;
        if (due > 0) {
          setStudentDue(due);
        } else {
          setStudentDue('No due left');
        }
        setStudentData(null);  // Clear student balance data
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage('Error checking dues');
        setStudentData(null);
        setStudentDue(null);
      });
  };

  // Function to handle open scanner
  const handleScannerOpen = () => {
    alert('Scanner opened!'); // This can be replaced with your scanner logic
  };

  return (
    <div className="stationary-container">
      <h1>Stationary Management</h1>
      
      <div className="options">
        <button onClick={() => handleOptionChange({ target: { value: 'roll' } })}>Enter Roll</button>
        <button onClick={() => handleOptionChange({ target: { value: 'due' } })}>Student Due</button>
      </div>

      {option === 'roll' && (
        <div>
          <input
            type="text"
            value={rollNumber}
            onChange={handleRollChange}
            placeholder="Enter roll number"
          />
          <button onClick={fetchStudentBalance}>Fetch Student Balance</button>

          {studentData && (
            <div>
              <h2>Student Details</h2>
              <p>Full Name: {studentData.fullName}</p>
              <p>Balance: {studentData.balance}</p>
              <button onClick={handleScannerOpen}>Open Scanner</button>
            </div>
          )}

          {errorMessage && <p>{errorMessage}</p>}
        </div>
      )}

      {option === 'due' && (
        <div>
          <input
            type="text"
            value={rollNumber}
            onChange={handleRollChange}
            placeholder="Enter roll number"
          />
          <button onClick={checkStudentDues}>Check Student Dues</button>

          {studentDue !== null && (
            <div>
              <h2>Student Dues</h2>
              <p>{studentDue}</p>
            </div>
          )}

          {errorMessage && <p>{errorMessage}</p>}
        </div>
      )}
    </div>
  );
}

export default Stationary;
