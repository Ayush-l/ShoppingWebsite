import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../Customer/Components/Login/Login.jsx';
import SignUp from '../Customer/Components/SignUp/SignUp.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/*" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
