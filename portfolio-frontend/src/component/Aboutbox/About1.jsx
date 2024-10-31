import React from 'react'

const About1 = ({ icon, title, value }) => {
    return (
        <div className="about-stat-item">
            <i className={icon} ></i>
            <span className="about-stat-title">{title}</span>
            <span className="about-stat-value">{value}</span>
        </div>
    )
}

export default About1
