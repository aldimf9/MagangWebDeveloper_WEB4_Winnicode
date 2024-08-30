import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import TestRegistration from './components/TestRegistration';
import Scores from './components/Scores';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/signup" />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/register-test/:id" element={<TestRegistration />} />
                <Route path="/scores/:id" element={<Scores />} />
            </Routes>
        </Router>
    );
}

export default App;
