import Link from 'next/link'
import React from 'react'
import './ContactBox.css'

const ContactBox = ({ icon, title, name, Href }) => {
  return (
    <div className='ContactBox'>
      <i className={icon}></i>
      <p className='contact-title'>{title}</p>
      <p className='contact-name'>{name}</p>
      <Link href={Href} target='_blank'>Write Me <i className='bx bx-right-arrow-alt'></i></Link>
    </div>
  )
}

export default ContactBox