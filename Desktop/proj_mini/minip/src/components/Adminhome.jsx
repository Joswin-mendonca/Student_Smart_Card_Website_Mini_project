import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import correctly
import { Link } from 'react-router-dom';
const AdminHome = () => {
  //const navigate = useNavigate(); // Hook used inside the function component
  
  // Handler functions for button clicks
//   const handleCreateStudent = () => {
//     console.log('Create Student button clicked');
//     navigate('/create_student'); // Redirects to another route
//   };

//   const handleViewEditStudent = () => {
//     console.log('View/Edit Student button clicked');
//     navigate('/view_edit_student');
//   };

//   const handleAddMoney = () => {
//     console.log('Add Money button clicked');
//     navigate('/add_money');
//   };

//   const handleDeleteStudent = () => {
//     console.log('Delete Student button clicked');
//     navigate('/delete_student');
//   };

  const WebStyle = {
    color:'white',
    backgroundColor:'black',
    padding:'10 10 10 10',
    margin:40,
    borderRadius:20,
    borderColor:'blue',
    borderWidth:10,
    fontFamily:'monospace',
    fontSize:30
  }
  return (
    <div>
    <center>
      <Link to='/Create_stud'><button style={WebStyle}>Create Student</button></Link>
      <br/>
      <Link to='/View_stud'><button style={WebStyle}>Edit/View Student</button></Link>
      <br/>
      <Link to='/Add_money'><button style={WebStyle}>Add Money</button></Link>
      <br/>
      <Link to='/Delete_stud'><button style={WebStyle}>Delete Student</button></Link>
      </center>
      <Link to='/'><button style={WebStyle}>Return To Home</button></Link>
    </div>
  );
};

export default AdminHome;
