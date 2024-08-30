import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';

function Scores() {
    const [scores, setScores] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();

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
    useEffect(() => {
        const fetchScores = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`http://localhost:3000/tests/scores/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res);
                setScores(res.data.test);
            } catch (error) {
                console.error(error);
                alert('Failed to fetch scores');
            }
        };

        fetchScores();
    }, [id]);

    return (
        <div>
            <button onClick={handleRegister}>Beranda</button>
            <h2>Your Test Scores</h2>
            <ul>
                {scores.map((score) => (
                    <li key={score.id}>
                        Test Date: {new Date(score.test_date).toLocaleDateString()} - Score: {score.score || 'Pending'} 
                    </li>
                ))}
            </ul>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Scores;
