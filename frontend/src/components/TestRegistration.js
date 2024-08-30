import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate,useParams} from 'react-router-dom';

function TestRegistration() {
    const [testDate, setTestDate] = useState('');
    const [paymentProof, setPaymentProof] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate(); 

    const handleLogout = () => {
        // Hapus token dari localStorage
        localStorage.removeItem('token');
        // Redirect ke halaman login
        navigate('/login');
    };

    const handleProfile = () => {
        // Redirect ke halaman login
        navigate(`/profile/${id}`);
    };
    const handleScore = () => {
        // Redirect ke halaman login
        navigate(`/scores/${id}`);
    };
    const handleDateChange = (e) => {
        setTestDate(e.target.value);
    };

    const handleFileChange = (e) => {
        setPaymentProof(e.target.files[0]);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`http://localhost:3000/tests/register/${id}`, { test_date: testDate }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const testId = res.data.test.id;

            const formData = new FormData();
            formData.append('testId', testId);
            formData.append('payment_proof', paymentProof);

            await axios.post(`http://localhost:3000/tests/payment/${id}/${testId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('Test registered successfully and payment proof uploaded');
        } catch (error) {
            console.error(error);
            alert('Failed to register for test');
        }
    };

    return (
        <div>
            <button onClick={handleProfile}>Profile</button>
            <button onClick={handleScore}>Nilai</button>
            <h2>Test Registration</h2>
            <form onSubmit={handleRegister}>
                <label>Choose Test Date:</label>
                <input type="date" value={testDate} onChange={handleDateChange} required />
                <label>Upload Payment Proof:</label>
                <input type="file" onChange={handleFileChange} required />
                <button type="submit">Register for Test</button>
            </form>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default TestRegistration;
