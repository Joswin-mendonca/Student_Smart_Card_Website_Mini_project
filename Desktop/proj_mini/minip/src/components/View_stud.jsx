import React, { useState } from 'react';
import axios from 'axios';
import { QrReader } from 'react-qr-reader'; // QR code scanner component

const View_stud = () => {
  const [roll, setRoll] = useState('');
  const [studentData, setStudentData] = useState(null); // To store the student data
  const [showScanner, setShowScanner] = useState(false); // Toggle the QR scanner
  const [scanResult, setScanResult] = useState(''); // To store the QR scan result

  // Handle the input change for Roll number
  const handleRollChange = (e) => {
    setRoll(e.target.value);
  };

  // Handle form submission (open the .txt file)
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Fetch the student details from the server (usnXX.txt file)
      const response = await axios.get(`http://localhost:5000/get-student-details/${roll}`);
      console.log('Response from server:', response.data); // Log the response data
  
      if (response.data) {
        setStudentData(response.data); // Set the student data
      } else {
        alert('Student data not found!');
      }
    } catch (error) {
      console.error('Error fetching student details:', error); // Log the error if the request fails
      alert('Failed to fetch student details');
    }
  };
  

  // Handle QR scan result
  const handleScan = (data) => {
    if (data) {
      setScanResult(data);
      alert(`QR Code Scanned: ${data}`);
    }
  };

  // Handle QR scanner error
  const handleError = (err) => {
    console.error('QR Code Scanner Error:', err);
  };

  return (
    <div>
      <h2>View Student Details</h2>

      {/* Input box for Roll number */}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={roll}
          onChange={handleRollChange}
          placeholder="Enter Roll Number"
          required
        />
        <button type="submit">View Student</button>
      </form>

      {/* Display student details */}
      {studentData && (
        <div>
          <h3>Student Details</h3>
          <p><strong>Full Name:</strong> {studentData.fullName}</p>
          <p><strong>Roll Number:</strong> {studentData.roll}</p>
          <p><strong>USN:</strong> {studentData.usn}</p>
          <p><strong>Date of Birth:</strong> {studentData.dob}</p>
          <p><strong>10th Percentage:</strong> {studentData.tenStdPercentage}%</p>
          <p><strong>2nd PUC Percentage:</strong> {studentData.pucPercentage}%</p>
          <p><strong>CGPA:</strong> {studentData.cgpa}</p>
          <p><strong>Father's Name:</strong> {studentData.fathersName}</p>
          <p><strong>Mother's Name:</strong> {studentData.mothersName}</p>
          <p><strong>Contact Number:</strong> {studentData.contact}</p>
          <p><strong>Blood Group:</strong> {studentData.bloodGroup}</p>
        </div>
      )}

      {/* Button to open QR scanner */}
      <button onClick={() => setShowScanner(!showScanner)}>
        {showScanner ? 'Close Scanner' : 'Open Scanner'}
      </button>

      {/* Show QR code scanner when the button is clicked */}
      {showScanner && (
        <div>
          <QrReader
            onScan={handleScan}
            onError={handleError}
            style={{ width: '100%' }}
          />
        </div>
      )}

      {/* Display scanned QR code result */}
      {scanResult && (
        <div>
          <h4>QR Code Scan Result:</h4>
          <p>{scanResult}</p>
        </div>
      )}
    </div>
  );
};

export default View_stud;
