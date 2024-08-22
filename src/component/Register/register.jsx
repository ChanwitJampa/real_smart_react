import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css'; 

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    fullName: yup.string().required('Full Name is required'),
    username: yup.string()
        .required('Username is required')
        .test('is-valid', 'Invalid email or phone number', value => {
            return yup.string().email('Invalid email format').isValidSync(value) || 
                   yup.string().matches(/^\d{10}$/, 'Invalid phone number format').isValidSync(value);
        }),
    password: yup.string().min(3, 'Password must be at least 3 characters').required('Password is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required')
});

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await axios.post('http://localhost:5000/api/users', data);
            alert('Registration successful!');
            navigate('/'); 
        } catch (error) {
            console.error('Registration failed:', error.response ? error.response.data : error.message);
            setErrorMessage('Registration failed. Please try again.');
        }
    };

    return (
        <div className="register-form">
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        {...register('name')}
                    />
                    {errors.name && <p className="error">{errors.name.message}</p>}
                </div>

                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        id="fullName"
                        type="text"
                        {...register('fullName')}
                    />
                    {errors.fullName && <p className="error">{errors.fullName.message}</p>}
                </div>

                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        {...register('username')}
                    />
                    {errors.username && <p className="error">{errors.username.message}</p>}
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        {...register('password')}
                    />
                    {errors.password && <p className="error">{errors.password.message}</p>}
                </div>

                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        {...register('confirmPassword')}
                    />
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
                </div>

                {errorMessage && <p className="error">{errorMessage}</p>}

                <button type="submit">Register</button>
                
    
                <button type="button" onClick={() => navigate('/')}>
                    Go to Login
                </button>
            </form>
        </div>
    );
};

export default Register;