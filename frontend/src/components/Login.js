import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignIn = () =>{
        try {
            navigate(`/signup`)
        } catch (error) {
            console.log(error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            navigate(`/register-test/${res.data.user.id}`);
        } catch (error) {
            console.error(error);
            alert('Login failed');
        }
    };

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <button type="submit">Login</button>
        </form>
        <button onClick={handleSignIn}>Sign Up</button>
        </div>
    );
}

export default Login;
