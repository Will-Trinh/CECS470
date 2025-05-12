import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUsers, setShowUsers] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    if (showUsers) {
      fetchUsers();
    }
  }, [showUsers]);

  const toggleShowUsers = () => {
    setShowUsers(!showUsers);
    if (!showUsers) {
      fetchUsers();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>User Management System</h1>
      </header>
      <main>
        <UserForm 
          selectedUser={selectedUser} 
          setSelectedUser={setSelectedUser} 
          fetchUsers={fetchUsers} 
        />
        
        <div className="controls">
          <button onClick={toggleShowUsers}>
            {showUsers ? 'Hide Users' : 'Show All Users'}
          </button>
        </div>
        
        {showUsers && (
          <UserList 
            users={users} 
            setSelectedUser={setSelectedUser} 
            fetchUsers={fetchUsers} 
          />
        )}
      </main>
    </div>
  );
}

export default App;
