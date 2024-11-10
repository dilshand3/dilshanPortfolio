"use client"
import React, { useEffect, useState, useRef } from 'react';
import './Education.css';
import Educationbox from '@/component/Educationbox/Educationbox';

const Education = () => {
  const [isVisible, setIsVisible] = useState(false);
  const educationRef = useRef(null);
  const serviceBoxRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (educationRef.current) {
        const rect = educationRef.current.getBoundingClientRect();
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (serviceBoxRef.current) {
      observer.observe(serviceBoxRef.current);
    }

    return () => {
      if (serviceBoxRef.current) {
        observer.unobserve(serviceBoxRef.current);
      }
    };
  }, []);


  return (
    <div className={`education ${isVisible ? 'animate' : ''}`} id='education' ref={serviceBoxRef}>
      <small>What I studied</small>
      <h2>Education Background</h2>
      <div className="education-container">
        <Educationbox year="2023-2024*" percentage="74% Marks"  title="Bachelor of Computer Applications" institute="skd university, hanumangrh" description="*It provides students with foundational knowledge in programming, software development, and web technologies, alongside essential skills in databases." />
        <Educationbox year="2022-2024"  percentage="82% Marks" title="+2 Science [PCM+B]" institute="goverment sen sec school, rawatsar" description="*Completed +2 Science with PCM+B subjects, gaining a strong foundation in science and mathematics. But I have a strong interest in computer science and programming." />
        <Educationbox year="2023-2023"  percentage="83% Marks" title="Rajsthan State Cetificate of Inforamtion and Technology" institute="arun computer center, rawatsar" description="*Completed RS-CIT course,gaining knowledge and practical knowledge of computer fundamentals." />
      </div>
    </div>
  )
}

export default Education
