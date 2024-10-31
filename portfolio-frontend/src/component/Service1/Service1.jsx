"use client"
import React, { useEffect, useRef } from 'react';

const Service1 = ({ title1, title2, onClick }) => {
  const serviceBoxRef = useRef(null);

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
    <div ref={serviceBoxRef} className="service-box" onClick={onClick}>
      <p>{title1} <br /> {title2}</p>
      <span>See more <i className='bx bx-right-arrow'></i></span>
    </div>
  );
}

export default Service1;
