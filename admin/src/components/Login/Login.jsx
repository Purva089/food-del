// Login.js
import React, { useState, useContext } from 'react';
import './Login.css';
import axios from 'axios';
import { url } from '../../assets/assets';
import { toast } from 'react-toastify';
import Sidebar from '../Sidebar/Sidebar';
import { AuthContext } from '../../Context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isAuthenticated, login } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { email, password };
        const response = await axios.post(`${url}/api/admin/adminLogin`, data);
        
        if (response.data.success) {
            toast.success("Login Successful");
            login(response.data.token);
        } else {
            toast.error(response.data.message);
        }
    };

    return (
        <>
            {isAuthenticated ? (
                <Sidebar />
            ) : (
                <div className="login-container">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder='Enter Email'
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder='Enter Password'
                            />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                </div>
            )}
        </>
    );
};

export default Login;
