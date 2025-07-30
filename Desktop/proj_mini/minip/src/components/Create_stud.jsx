import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Create_stud = () => {
  const [roll, setRoll] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRollChange = (e) => {
    setRoll(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    // Validate the roll number
    if (!roll || isNaN(roll) || roll.length < 1) {
      setMessage('Please enter a valid roll number.');
      setLoading(false);
      return;
    }

    // Ensure roll number is two digits (pad if necessary)
    const paddedRoll = roll.padStart(2, '0');

    try {
      console.log('Sending request with roll:', paddedRoll);
      const response = await axios.post('http://localhost:5000/check-student', { roll: paddedRoll });
      console.log('Response from server:', response.data);

      if (response.data.exists) {
        setMessage('Student already exists.');
      } else {
        const usn = `4MT22CI0${paddedRoll}`;
        setMessage(`Student does not exist. Suggested USN: ${usn}`);
        
        // Navigate to Fill_stud with roll and usn as query params
        //navigate(`/Fill_stud/${roll}`, { state: { roll: paddedRoll, usn: usn } });
        navigate(`/Fill_stud?roll=${paddedRoll}&usn=${usn}`);
      }
    } catch (error) {
      console.error('Error while checking student:', error);
      setMessage('Error checking student.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Check Student Existence</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="roll">Enter Roll Number: </label>
          <input
            type="text"
            id="roll"
            value={roll}
            onChange={handleRollChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Checking...' : 'Check'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Create_stud;
