import React from 'react';
import "./Offer.css";

const Web = ({ onClose }) => {
  return (
    <div className='offer-box'>
      <div className="offer-content">
        <i className='bx bx-x' onClick={onClose}></i>
        <h4>Web Development</h4>
        <p>I develop websites with creative ability and hands-on approach which stisfies the customers' and markets' needs and trends.</p>
        <ul>
          <li><i className='bx bx-check-circle'></i> Custom Web Application Development</li>
          <li><i className='bx bx-check-circle'></i> Web Page design and development.</li>
          <li><i className='bx bx-check-circle'></i> I create the UX element interactions.</li>
          <li><i className='bx bx-check-circle'></i> Full Maintenance & Support.</li>
        </ul>
      </div>
    </div>
  )
}

export default Web