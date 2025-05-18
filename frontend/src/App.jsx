import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './features/auth/Login';
import Register from './features/auth/Register';


function App() {
  return (
    <Routes>
      <Route path="/" element={<h2>Welcome to BookBarter 📚</h2>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
     
    </Routes>
  );
}

export default App;
