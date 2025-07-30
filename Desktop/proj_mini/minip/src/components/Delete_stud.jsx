import React, { useState } from 'react';
import axios from 'axios';

const Delete_stud = () => {
  const [roll, setRoll] = useState(''); // State to store the Roll number
  const [error, setError] = useState(null); // State to store error messages
  const [successMessage, setSuccessMessage] = useState(null); // State to store success message

  // Handle Roll number input change
  const handleRollChange = (e) => {
    setRoll(e.target.value);
  };

  // Handle student removal from database
  const handleRemoveStudent = async () => {
    if (!roll) {
      setError('Please enter a Roll number'); // Error if Roll number is empty
      return;
    }

    try {
      // Send DELETE request to backend to remove student by roll number
      const response = await axios.delete(`http://localhost:5000/remove-student/${roll}`);
      setSuccessMessage(`Student with Roll number ${roll} was successfully removed.`);
      setError(null); // Clear any previous errors
      setRoll(''); // Clear Roll number input field
    } catch (error) {
      setError('Error deleting student');
      setSuccessMessage(null); // Clear any previous success messages
    }
  };

  return (
    <div>
      <h2>Remove Student</h2>
      
      {/* Roll number input */}
      <div>
        <input
          type="text"
          placeholder="Enter Roll Number"
          value={roll}
          onChange={handleRollChange}
        />
      </div>

      {/* Display error or success message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      {/* Delete button */}
      <div>
        <button onClick={handleRemoveStudent}>Delete Student</button>
      </div>
    </div>
  );
};

export default Delete_stud;
