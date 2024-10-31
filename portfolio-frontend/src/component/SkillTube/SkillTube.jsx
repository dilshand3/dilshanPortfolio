"use client"
import React, { useEffect, useState, useRef } from 'react'
import './SkillTube.css'

const SkillTube = ({ icon, name, value }) => {
    const [isVisible, setIsVisible] = useState(false);
    const skillTubeRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (skillTubeRef.current) {
                const rect = skillTubeRef.current.getBoundingClientRect();
                if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div ref={skillTubeRef} className={`skillTube-container ${isVisible ? 'animate' : ''}`}>
            <div className="tube-top">
                <span className='skill-nameIcon'>
                    <span className='skill-icon'>{icon}</span>
                    <p className='skill-name'>{name}</p>
                </span>
                <span className='skill-value'>{value}%</span>
            </div>
            <meter value={value} min="0" max="100"></meter>
        </div>
    )
}

export default SkillTube
