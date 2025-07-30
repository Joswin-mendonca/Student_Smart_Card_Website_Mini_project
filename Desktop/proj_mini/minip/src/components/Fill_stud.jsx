import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Fill_stud = () => {
  const [studentDetails, setStudentDetails] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    tenStdPercentage: '',
    pucPercentage: '',
    cgpa: '',
    fathersName: '',
    mothersName: '',
    contact: '',
    bloodGroup: '',
  });

  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const { roll, usn } = useParams(); // Retrieve Roll and USN from URL
  const navigate = useNavigate();

  const handleChange = (e) => {
    setStudentDetails({
      ...studentDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName = `${studentDetails.firstName} ${studentDetails.middleName} ${studentDetails.lastName}`;
    const dataToSave = { ...studentDetails, roll, usn, fullName };

    try {
      // Save student data to file and database (you may adjust this part)
      await axios.post('http://localhost:5000/save-student-file', {
        studentDetails: dataToSave,
      });

      // Generate the QR code
      const response = await axios.post('http://localhost:5000/generate-qr-code', {
        studentDetails: dataToSave,
      });

      setQrCodeUrl(response.data.qrCodeUrl);
      navigate('/'); // Redirect to home or another page after submission
    } catch (error) {
      console.error('Error saving student details:', error);
    }
  };

  return (
    <div>
      <h2>Fill Student Details</h2>
      <form onSubmit={handleSubmit}>
        {/* Inputs for student details */}
        <input type="text" name="firstName" placeholder="First Name" value={studentDetails.firstName} onChange={handleChange} required />
        <input type="text" name="middleName" placeholder="Middle Name" value={studentDetails.middleName} onChange={handleChange} />
        <input type="text" name="lastName" placeholder="Last Name" value={studentDetails.lastName} onChange={handleChange} required />
        <input type="date" name="dob" value={studentDetails.dob} onChange={handleChange} required />
        {/* Additional form fields... */}
        <button type="submit">Submit</button>
      </form>

      {/* Display the generated QR code */}
      {qrCodeUrl && (
        <div>
          <h3>Generated QR Code:</h3>
          <img src={qrCodeUrl} alt="QR Code" />
        </div>
      )}
    </div>
  );
};

export default Fill_stud;
