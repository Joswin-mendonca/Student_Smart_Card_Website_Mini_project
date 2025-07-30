import React, { useState } from 'react';
import axios from 'axios'; // For making API calls

function LibraryLog() {
  const [option, setOption] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [studentFine, setStudentFine] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Roll Number input change
  const handleRollChange = (e) => {
    setRollNumber(e.target.value);
  };

  // Handle option change
  const handleOptionChange = (e) => {
    setOption(e.target.value);
    setStudentData(null);  // Reset student data and error message
    setStudentFine(null);
    setErrorMessage('');
  };

  // Function to fetch student balance (similar to fetching from library)
  const fetchStudentBalance = () => {
    axios
      .get(`http://localhost:5000/get-student-details/${rollNumber}`) // Assuming this route returns student details
      .then((response) => {
        const student = response.data;
        setStudentData(student);
        setStudentFine(null);  // Clear any fine data
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage('Invalid student');
        setStudentData(null);
        setStudentFine(null);
      });
  };

  // Function to check student fines
  const checkStudentFines = () => {
    axios
      .get(`http://localhost:5000/get-student-fines/${rollNumber}`) // Assuming you have this endpoint for fines
      .then((response) => {
        const fine = response.data.fine;
        if (fine > 0) {
          setStudentFine(fine);
        } else {
          setStudentFine('No fine left');
        }
        setStudentData(null);  // Clear student balance data
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage('Error checking fines');
        setStudentData(null);
        setStudentFine(null);
      });
  };

  // Function to handle open scanner
  const handleScannerOpen = () => {
    alert('Scanner opened!'); // This can be replaced with your scanner logic
  };

  return (
    <div className="library-log-container">
      <h1>Library Management</h1>
      
      <div className="options">
        <button onClick={() => handleOptionChange({ target: { value: 'roll' } })}>Enter Roll</button>
        <button onClick={() => handleOptionChange({ target: { value: 'fine' } })}>Student Fine</button>
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

      {option === 'fine' && (
        <div>
          <input
            type="text"
            value={rollNumber}
            onChange={handleRollChange}
            placeholder="Enter roll number"
          />
          <button onClick={checkStudentFines}>Check Student Fine</button>

          {studentFine !== null && (
            <div>
              <h2>Student Fine</h2>
              <p>{studentFine}</p>
            </div>
          )}

          {errorMessage && <p>{errorMessage}</p>}
        </div>
      )}
    </div>
  );
}

export default LibraryLog;
