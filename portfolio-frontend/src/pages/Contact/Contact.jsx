"use client";
import React, { useState } from 'react';
import ContactBox from "../../component/Contact/ContactBox";
import "./Contact.css";
import { useAuth } from '@/store/useAuth';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const { userDetails, SendFeedback, MyLocation } = useAuth();

  const handleFeedback = async (e) => {
    e.preventDefault();

    if (!userDetails) {
      toast.error("Please login to send feedback");
      return;
    }

    try {
      await SendFeedback(name, feedback);
      setName("");
      setFeedback("");
    } catch (error) {
      console.error("Error sending feedback:", error);
    }
  };

  return (
    <div className='contact' id='contact'>
      <small>Get in touch</small>
      <h2>Contact Me</h2>
      <div className="contact-container">
        <div className="contact1-container">
          <h2>Talk to me</h2>
          <ContactBox name='dilshan72404@gmail.com' title='Email' icon='bx bxl-gmail' Href='mailto:dilshan72404@gmail.com' />
          <ContactBox name='+917240453567' title='Phone' icon='bx bx-phone' Href='tel:+917240453567' />
          <ContactBox name='Hanumangrh, Rajasthan' title='Address' icon='bx bx-map' Href={MyLocation} />
        </div>
        <div className="form-container">
          <h2>Write Me your Message</h2>
          <form onSubmit={handleFeedback}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter Name'
              required
            />
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder='Write Your Message'
              required
            />
            <button type='submit'>Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
