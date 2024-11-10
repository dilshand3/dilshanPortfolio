'use client'
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../store/useAuth";
import './EmailVerification.css';
import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast';

const EmailVerificationPage = ({ onVerificationSuccess}) => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);

    const { error, isLoading, verifyEmail, setUserDetails } = useAuth();

    const handleChange = (index, value) => {
        const newCode = [...code];
        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus();
        } else {
            newCode[index] = value;
            setCode(newCode);
            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const verifyEmailCode = async (verificationCode) => {
        try {
            const response = await fetch('https://dilshan-d3.onrender.com/api/user/verifyEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: verificationCode }),
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setUserDetails(data.user);
                const adminVoiceMessage = new SpeechSynthesisUtterance("Email verify successfully");
                window.speechSynthesis.speak(adminVoiceMessage);
                toast.success('Email verified successfully');
                onVerificationSuccess();
            } else {
                toast.error('Verification failed');
            }

        } catch (error) {
            console.log(error);
            toast.error('An error occurred during verification');
        }
    };

    useEffect(() => {
        if (code.every((digit) => digit !== "")) {
            const verificationCode = code.join("");
            verifyEmailCode(verificationCode);
        }
    }, [code, verifyEmailCode]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (

        <>
            <div className="email-container">
                <div className='email-verification-container'>
                    <div className='email-verification-content'>
                        <h2 className='email-verification-title'>Verify Your Email</h2>
                        <p className='email-verification-description'>Enter the 6-digit code sent to your email address.</p>
                        <form onSubmit={handleSubmit} className='email-verification-form'>
                            <div className='email-verification-inputs'>
                                {code.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        type='text'
                                        maxLength='6'
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className='email-verification-input'
                                    />
                                ))}
                            </div>
                            {error && <p className='email-verification-error'>{error}</p>}
                            <button
                                type='submit'
                                disabled={isLoading || code.some((digit) => !digit)}
                                className='email-verification-button'
                            >
                                {isLoading ? "Verifying..." : "Verify Email"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmailVerificationPage;