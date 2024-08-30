import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';

function Profile() {
    const {id} = useParams();
    const [profileData, setProfileData] = useState({
        fullname: '',
        email: '',
        role: '',
    });
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`http://localhost:3000/auth/profile/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res);
                setProfileData(res.data);
            } catch (error) {
                console.error(error);
                alert('Failed to fetch profile data');
            }
        };

        fetchProfile();
    }, [id]);

    const handleLogout = () => {
        // Hapus token dari localStorage
        localStorage.removeItem('token');
        // Redirect ke halaman login
        navigate('/login');
    };

    const handleRegister = () => {
        // Redirect ke halaman login
        navigate(`/register-test/${id}`);
    };

    const handleChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:3000/auth/edit/${id}`, profileData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Profile updated successfully');
        } catch (error) {
            console.error(error);
            alert('Failed to update profile');
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/auth/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            localStorage.removeItem('token');
            navigate('/signup');
        } catch (error) {
            console.error(error);
            alert('Failed to delete account');
        }
    };

    return (
        <div>
            <button onClick={handleRegister}>Beranda</button>
            <h2>Profile</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="fullname" placeholder="Full Name" value={profileData.fullname} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={profileData.email} onChange={handleChange} required />
                <select name="role" value={profileData.role} onChange={handleChange} required>
                    <option value="umum">Umum</option>
                    <option value="karyawan">Karyawan</option>
                </select>
                <button type="submit">Update Profile</button>
            </form>
            <button onClick={handleDelete}>Delete Account</button>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
}

export default Profile;
