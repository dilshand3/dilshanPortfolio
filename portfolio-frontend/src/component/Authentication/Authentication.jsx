'use client'
import React, { useState } from 'react'
import './Authentication.css'
import { useAuth } from '@/store/useAuth';

const Authentication = ({ onSignupSuccess }) => {
    const { toggleAuthentication, isSignUp, toggleFormType, signUp, logIn, authError } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        number: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = isSignUp
            ? formData
            : { email: formData.email, password: formData.password };

        if (isSignUp) {
            await signUp(dataToSend, onSignupSuccess);
        } else {
            await logIn(dataToSend, onSignupSuccess);
        }
    };

    return (
        <>
            <div className='authentication-container'>
                <div className="authentication-form">
                    <header>
                        <h3>{isSignUp ? 'Sign Up' : 'Sign In'}</h3>
                        <i className='bx bx-x' onClick={toggleAuthentication}></i>
                    </header>

                    <form onSubmit={handleSubmit}>
                        {isSignUp && <input type="text" name="username" placeholder='Username' value={formData.username} onChange={handleChange} />}
                        <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} />
                        {isSignUp && <input type="text" name="number" placeholder='Phone Number' value={formData.number} onChange={handleChange} />}
                        <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} />
                        <button type='submit'>{isSignUp ? 'Sign Up' : 'Sign In'}</button>
                    </form>
                    {authError && <p className="error-message">{authError}</p>}
                    <p>
                        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                        <span onClick={toggleFormType}>{isSignUp ? 'Sign In' : 'Sign Up'}</span>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Authentication