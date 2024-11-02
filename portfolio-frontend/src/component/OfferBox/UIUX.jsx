import React from 'react';
import "./Offer.css";

const UIUX = ({ onClose }) => {
  return (
    <div className='offer-box'>
      <div className="offer-content">
        <i className='bx bx-x' onClick={onClose}></i>
        <h4>UI/UX Design</h4>
        <p>I design and develop the consumer products with creative ability and hands-on approach which stisfies the customers and markets needs and trends.</p>
        <ul>
          <li><i className='bx bx-check-circle'></i> I develop the user interfaces.</li>
          <li><i className='bx bx-check-circle'></i> Web Page design and development.</li>
          <li><i className='bx bx-check-circle'></i> I create the UX element interactions.</li>
          <li><i className='bx bx-check-circle'></i> I position your company brand.</li>
          <li><i className='bx bx-check-circle'></i> Create modern 3-D experiences.</li>
        </ul>
      </div>
    </div>
  )
}

export default UIUX
