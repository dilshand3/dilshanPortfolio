import React from 'react';
import "./Offer.css";

const AppDevel = ({ onClose }) => {
  return (
    <div className='offer-box'>
      <div className="offer-content">
        <i className='bx bx-x' onClick={onClose}></i>
        <h4>IOS & Android Development</h4>
        <p>I develop IOS and Android apps with creative ability and hands-on approach which stisfies the customers' and markets' needs and trends.</p>
        <ul>
          <li><i className='bx bx-check-circle'></i> Custom Mobile App Development.</li>
          <li><i className='bx bx-check-circle'></i> App Optimization & Performance.</li>
          <li><i className='bx bx-check-circle'></i> Cross-Platform Expertise.</li>
          <li><i className='bx bx-check-circle'></i> User-Centered Design.</li>
        </ul>
      </div>
    </div>
  )
}

export default AppDevel