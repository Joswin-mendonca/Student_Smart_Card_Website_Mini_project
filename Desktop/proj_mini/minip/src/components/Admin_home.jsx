import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigating to other routes if needed

const AdminHome = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle "Create Student"
  const handleCreateStudent = () => {
    console.log('Create Student button clicked');
    // Here you can navigate to the Create Student page or show the relevant form
    // navigate('/create_student'); // Example navigation (you'll need to create a route and component)
  };

  // Function to handle "View/Edit Student"
  const handleViewEditStudent = () => {
    console.log('View/Edit Student button clicked');
    // Navigate to a page for viewing/editing students
    // navigate('/view_edit_student');
  };

  // Function to handle "Add Money"
  const handleAddMoney = () => {
    console.log('Add Money button clicked');
    // Navigate to the Add Money page or show the form
    // navigate('/add_money');
  };

  // Function to handle "Delete Student"
  const handleDeleteStudent = () => {
    console.log('Delete Student button clicked');
    // Navigate to a page for deleting students or show a confirmation dialog
    // navigate('/delete_student');
  };

  return (
    <div className="admin-home-container">
      <h2>Welcome to Admin Home</h2>
      <p>This is the Admin dashboard with management options.</p>

      {/* Button 1: Create Student */}
      <button onClick={handleCreateStudent}>Create Student</button>

      {/* Button 2: View/Edit Student */}
      <button onClick={handleViewEditStudent}>View/Edit Student</button>

      {/* Button 3: Add Money */}
      <button onClick={handleAddMoney}>Add Money</button>

      {/* Button 4: Delete Student */}
      <button onClick={handleDeleteStudent}>Delete Student</button>
    </div>
  );
};

export default AdminHome;
