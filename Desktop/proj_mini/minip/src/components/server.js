const express = require('express');
const fs = require('fs');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // To manage paths
const QRCode = require('qrcode'); // Import the qrcode library for generating QR codes

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// Ensure the QR_codes directory exists
const qrCodesDir = path.join(__dirname, 'QR_codes');
if (!fs.existsSync(qrCodesDir)) {
  fs.mkdirSync(qrCodesDir);
}

// MySQL setup
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'joswin', // Update with your DB credentials
  database: 'students_db',
});

// Route to save student details to a file and database
app.post('/save-student-file', (req, res) => {
  const studentDetails = req.body.studentDetails; // Get student details from the request body
  
  // Log the incoming student data to debug
  console.log(studentDetails);

  const fileName = `usn${studentDetails.roll}.txt`; // Create filename based on roll number
  
  // Save student data to a .txt file
  fs.writeFile(path.join(__dirname, fileName), JSON.stringify(studentDetails, null, 2), (err) => {
    if (err) {
      console.error('Error saving file:', err); // Log error if file saving fails
      return res.status(500).send('Error saving the file');
    }

    // Insert student data into the database (optional, can be re-enabled)
    db.query(query, [roll], (err, result) => {
      if (err) {
        console.error('Error checking student:', err); // This will print the exact error message from MySQL
        return res.status(500).send('Error checking student.');
      }
    
      if (result.length > 0) {
        res.status(200).json({ message: 'Student exists', student: result[0] });
      } else {
        res.status(404).send('Student not found');
      }
    });
    
    
      // Trigger QR code generation and saving to the 'QR_codes' folder
      const qrCodeFileName = `${studentDetails.roll}_${studentDetails.usn}.png`; // QR code file name
      const qrCodePath = path.join(qrCodesDir, qrCodeFileName); // Path to save QR code

      // Generate the QR code and save it to the folder
      QRCode.toFile(qrCodePath, JSON.stringify(studentDetails), (err) => {
        if (err) {
          console.error('Error generating QR code:', err);
          return res.status(500).send('Error generating QR code');
        }

        // After successful QR code generation, send the URL/path back to frontend
        const qrCodeUrl = `/QR_codes/${qrCodeFileName}`; // URL for accessing the QR code
        console.log(`QR Code generated: ${qrCodeUrl}`);

        res.status(200).json({ message: 'Student data saved and QR code generated', qrCodeUrl });
      });
    });
  });

// Route to fetch student details by Roll number
app.get('/get-student-details/:roll', (req, res) => {
  const roll = req.params.roll;
  const fileName = `usn${roll}.txt`; // Use roll number to form the filename
  
  console.log(`Fetching details for roll number: ${roll}`); // Log the roll number
  
  fs.readFile(`./${fileName}`, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err); // Log the error if the file is not found
      return res.status(404).send('Student not found');
    }

    try {
      const studentDetails = JSON.parse(data); // Parse the data from the file
      res.json(studentDetails); // Return the student data
    } catch (error) {
      console.error('Error parsing student data:', error); // Log error if parsing fails
      res.status(500).send('Error parsing student data');
    }
  });
});

// Serve QR codes from the 'QR_codes' directory
app.use('/QR_codes', express.static(qrCodesDir));

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
