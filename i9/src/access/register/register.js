// RegisterForm.js
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../utils/context/authentication';
import API_BASE_URL from '../../config';
import './register.css';

const RegisterForm = () => {
    const navigate = useNavigate();

    const { authState, login } = useAuthContext();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // Handle form submission
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            // Capitalize first letter of first and last names
            const capitalizedFirstName = capitalizeFirstLetter(firstName);
            const capitalizedLastName = capitalizeFirstLetter(lastName);

            const data = {
                username: username,
                password: password,
                email: email,
                first_name: capitalizedFirstName,
                last_name: capitalizedLastName,
            };
            // Send registration data to the backend
            const response = await axios.post(`${API_BASE_URL}access/register/`, data, config);

            // Handle the response from the backend as needed
            console.log(response.data);
            login(response.data);
            navigate('/calculator');

        } catch (error) {
            // Handle registration error
            console.error('Registration failed:', error.message);
        }
    };

    return (
        <div className="register-auth-container">
            <div className="register-auth-card">
                <h2>Register</h2>
                <form onSubmit={handleRegisterSubmit}>
                    <div className='register-card-full-name'>
                        <input type="text" id="firstName" name='firstName' placeholder="First Name" required
                            onChange={(e) => setFirstName(e.target.value)} />

                        <input type="text" id="lastName" name="lastName" placeholder="Last Name" required
                            onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className='register-card-other-fields'>
                        <input type="text" id="username" name="username" placeholder="Username" required
                            onChange={(e) => setUsername(e.target.value)} />

                        <input type="email" id="email" name="email" placeholder="Email" required
                            onChange={(e) => setEmail(e.target.value)} />

                        <input type="password" id="password" name="password" placeholder="Password" required
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='redirect-to-login'>
                        <a href="/access/login">Already have an account? Login</a>
                    </div>

                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
