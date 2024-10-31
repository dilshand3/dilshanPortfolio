"use client"
import React, { useState, useEffect } from 'react';
import "./Service.css";
import Service1 from '@/component/Service1/Service1';
import UIUX from '@/component/OfferBox/UIUX';
import Web from '@/component/OfferBox/Web';
import AppDevel from '@/component/OfferBox/AppDevel';

const Service = () => {
  const [showUIUX, setShowUIUX] = useState(false);
  const [showWeb, setShowWeb] = useState(false);
  const [showAppDevel, setShowAppDevel] = useState(false);

  const toggleUIUX = () => setShowUIUX(!showUIUX);
  const toggleWeb = () => setShowWeb(!showWeb);
  const toggleAppDevel = () => setShowAppDevel(!showAppDevel);

  useEffect(() => {
    if (showUIUX || showWeb || showAppDevel) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showUIUX, showWeb, showAppDevel]);

  return (
    <>
      <div className='service' id='service'>
        <header className='service-header'>
          <small>My Services</small>
          <h2>What I offer</h2>
        </header>
        <div className="service-container">
          <Service1 title1="IOS & Android" title2="Development" onClick={toggleAppDevel} />
          <Service1 title1="Web" title2="Development" onClick={toggleWeb} />
          <Service1 title1="UI/UX" title2="Designing" onClick={toggleUIUX} />
        </div>
      </div>
      {showUIUX && <UIUX onClose={toggleUIUX} />}
      {showWeb && <Web onClose={toggleWeb} />}
      {showAppDevel && <AppDevel onClose={toggleAppDevel} />}
    </>
  )
}

export default Service
