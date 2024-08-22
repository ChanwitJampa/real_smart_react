// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './component/login/loginForm.jsx';
import SuccessPage from './component/user/userInfo.jsx'; 
import Register from './component/Register/register.jsx';


function App() {
    return (
        <Router>
            <Routes>
         
                <Route path="/" element={<LoginForm />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;