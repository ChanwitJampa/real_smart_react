import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css'; // import your CSS

const schema = yup.object().shape({
    username: yup.string()
        .required('Email or phone number is required')
        .test('is-valid', 'Invalid email or phone number', value => {
            return yup.string().email('Invalid email format').isValidSync(value) || 
                   yup.string().matches(/^\d{10}$/, 'Invalid phone number format').isValidSync(value);
        }),
    password: yup.string().min(3, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', data);
            console.log('Login successful:', response.data);
            // Redirect to success page
            navigate('/success');
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            setErrorMessage('Login failed. Please check your username and password.');
        }
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="username">Email or Phone</label>
                    <input
                        id="username"
                        type="text"
                        {...register('username')}
                    />
                    {errors.username && <p>{errors.username.message}</p>}
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        {...register('password')}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>

                {errorMessage && <p className="error">{errorMessage}</p>}

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;