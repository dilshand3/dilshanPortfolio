import React from 'react'
import './Footer.css'
import Link from 'next/link'
import { useAuth } from '../../store/useAuth'

const Footer = () => {
    const { githubURL, instagramURL, linkedinURL, twitterURL } = useAuth();
    return (
        <div className='footer' id='footer'>
            <h2>Thank You For Visiting</h2>
            <nav className='footer-main-nav'>
                <ul className="footer-social">
                    <li>
                        <Link href={githubURL} target='_blank' className='footer-icon'>
                            <i className='bx bxl-github' ></i>
                        </Link>
                    </li>
                    <li>
                        <Link href={instagramURL} target='_blank' className='footer-icon'>
                            <i className='bx bxl-instagram'></i>
                        </Link>
                    </li>
                    <li>
                        <Link href={twitterURL} target='_blank' className='footer-icon'>
                            <i className='bx bxl-twitter'></i>
                        </Link>
                    </li>
                    <li>
                        <Link href={linkedinURL} target='_blank' className='footer-icon'>
                            <i className='bx bxl-linkedin' ></i>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className='footer-line'></div>
            <p><small>© 2024 developer dilshan. All rights reserved.</small></p>
        </div>
    )
}

export default Footer