import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

function Signup() {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        role: 'umum',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            
            const res = await axios.post('http://localhost:3000/auth/signup', formData);
            alert(res.data.message);
        } catch (error) {
            console.error(error);
            alert('Registration failed');
        }
    };

    const handleLogIn = ()=>{
        try {
            navigate(`/login`)
        } catch (error) {
            console.log(error);
            
        }
    };

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <input type="text" name="fullname" placeholder="Full Name" value={formData.fullname} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <select name="role" value={formData.role} onChange={handleChange}>
                <option value="umum">Umum</option>
                <option value="karyawan">Karyawan</option>
            </select>
            <button type="submit">Sign Up</button>
        </form>
        <button onClick={handleLogIn}>Log In</button>
        </div>
    );
}

export default Signup;
