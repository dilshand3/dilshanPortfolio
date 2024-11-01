"use client"
import React, { useEffect, useRef, useState } from 'react';
import './Home1.css';
import Authentication from '@/component/Authentication/Authentication.jsx';
import { useAuth } from '@/store/useAuth';
import EmailVerificationPage from '@/component/EmailVerification/EmailVerification.jsx';
import Image from 'next/image';
import Link from 'next/link';
import LoadingImg from "../../assets/Images/LoadingImg.png";

const Home1 = ({ profileImg, myCV }) => {
    const { showAuthentication, toggleAuthentication, isSignUp, shareAdmin } = useAuth();
    const [showEmailVerification, setShowEmailVerification,] = useState(false);
    const animatedRoleRef = useRef(null);
    const [AdminData, setAdminData] = useState([]);

    useEffect(() => {
        const fetchAdminData = async () => {
            const data = await shareAdmin();
            setAdminData(data);
        }
        fetchAdminData();
    }, []);

    useEffect(() => {
        if (showAuthentication) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [showAuthentication]);

    const handleSignupSuccess = () => {
        if (isSignUp) {
            setShowEmailVerification(true);
        }
        toggleAuthentication();
    };

    const handleEmailVerificationSuccess = () => {
        setShowEmailVerification(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (animatedRoleRef.current) {
                const rect = animatedRoleRef.current.getBoundingClientRect();
                if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                    animatedRoleRef.current.classList.add('animate');
                } else {
                    animatedRoleRef.current.classList.remove('animate');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <div className='home-container' id='home'>
                <main className='home-main'>
                    <div className='home-main-content'>

                        <Image src={profileImg || LoadingImg} alt="profile" height={300} width={300} priority />
                        <h4>Hello</h4>
                        <h1 className="animated-title">I'm <strong style={{ color: "var(--purple-color)" }}>Dilshan</strong></h1>
                        <p ref={animatedRoleRef} className="animated-role">Software Developer</p>
                        <div className='home-main-btn'>
                            <Link href={`${myCV}`} className='resume-btn' target='_blank'>Watch Resume</Link>
                            <button className='contact-btn' onClick={scrollToContact}>Contact Me</button>
                        </div>
                    </div>
                </main>
            </div>
            {showAuthentication && !showEmailVerification && <Authentication onSignupSuccess={handleSignupSuccess} />}
            {showEmailVerification && <EmailVerificationPage onVerificationSuccess={handleEmailVerificationSuccess} />}
        </>
    )
}

export default Home1
