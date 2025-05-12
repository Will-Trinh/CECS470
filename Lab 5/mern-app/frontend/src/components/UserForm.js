import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ selectedUser, setSelectedUser, fetchUsers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
    } else {
      setName('');
      setEmail('');
    }
  }, [selectedUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedUser) {
        // Update existing user
        await axios.put(`http://localhost:5000/api/users/${selectedUser._id}`, {
          name,
          email,
        });
      } else {
        // Create new user
        await axios.post('http://localhost:5000/api/users', {
          name,
          email,
        });
      }
      
      // Reset form and refresh user list
      setName('');
      setEmail('');
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    setName('');
    setEmail('');
    setSelectedUser(null);
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h2>{selectedUser ? 'Update User' : 'Add User'}</h2>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-buttons">
        <button type="submit">{selectedUser ? 'Update' : 'Add'} User</button>
        {selectedUser && (
          <button type="button" onClick={handleCancel}>Cancel</button>
        )}
      </div>
    </form>
  );
};

export default UserForm;
