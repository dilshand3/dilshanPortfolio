"use client"
import React, { useEffect, useState, useRef } from 'react'

const Educationbox = ({ year, title, institute, description }) => {
    const [isVisible, setIsVisible] = useState(false);
    const boxRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (boxRef.current) {
                const rect = boxRef.current.getBoundingClientRect();
                if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div ref={boxRef} className={`education-box ${isVisible ? 'animate' : ''}`}>
            <div className="education-box-year">
                <p>{year}</p>
            </div>
            <div className="education-box-info">
                <h3>{title}</h3>
                <small>{institute.toUpperCase()}</small>
                <p className='education-box-description'>{description}</p>
            </div>
            <button className='education-box-btn'>See certificate</button>
        </div>
    )
}

export default Educationbox
