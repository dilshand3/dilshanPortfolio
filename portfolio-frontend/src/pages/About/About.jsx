"use client"
import React, { useEffect, useRef, } from 'react';
import "./About.css";
import About1 from "@/component/Aboutbox/About1"
import Image from 'next/image';
import loadingImg from "@/assets/loadingimg.png"

const About = ({ aboutImg }) => {
    const animatedDescriptionRef = useRef(null);
    const animatedImageRef = useRef(null);
    const animatedButtonRef = useRef(null);

    const handleScroll = () => {
        const descriptionRect = animatedDescriptionRef.current.getBoundingClientRect();
        const imageRect = animatedImageRef.current.getBoundingClientRect();
        const buttonRect = animatedButtonRef.current.getBoundingClientRect();

        if ((descriptionRect.top >= 0 && descriptionRect.bottom <= window.innerHeight) ||
            (imageRect.top >= 0 && imageRect.bottom <= window.innerHeight)) {
            animatedDescriptionRef.current.classList.add('animate');
            animatedImageRef.current.classList.add('animate');
        } else {
            animatedDescriptionRef.current.classList.remove('animate');
            animatedImageRef.current.classList.remove('animate');
        }

        if (buttonRect.top >= 0 && buttonRect.bottom <= window.innerHeight) {
            animatedButtonRef.current.classList.add('animate');
        } else {
            animatedButtonRef.current.classList.remove('animate');
        }

        const aboutStats = document.querySelectorAll('.about-stats > div');
        aboutStats.forEach(stat => {
            const statRect = stat.getBoundingClientRect();
            if (statRect.top >= 0 && statRect.bottom <= window.innerHeight) {
                stat.classList.add('animate');
            } else {
                stat.classList.remove('animate');
            }
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
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
        <div className='about-container' id='about'>
            <header>
                <small>My Intro</small>
                <h2>About Me</h2>
            </header>
            <div className="about-profile">
                <Image className="about-profile-img" src={aboutImg || loadingImg} alt="profile" ref={animatedImageRef} height={300} width={300} priority />
                <div className="about-info">
                    <div className="about-stats">
                        <About1 icon="bx bx-medal" title="Experience" value="1+ Year Working" />
                        <About1 icon="bx bx-briefcase-alt" title="Completed" value="48+ Projects" />
                        <About1 icon="bx bx-support" title="Support" value="Online 24/7" />
                    </div>
                    <p ref={animatedDescriptionRef} className="about-description">
                        I'm a Software Developer skilled in building web apps, UI/UX designs, and developing Android and IOS apps. Currently, I’m in the second year of my Bachelor's in Computer Applications.
                    </p>
                    <button
                        ref={animatedButtonRef}
                        className="about-contact-btn"
                        onClick={scrollToContact}
                    >
                        Contact Me
                    </button>
                </div>
            </div>
        </div>
    )
}

export default About
