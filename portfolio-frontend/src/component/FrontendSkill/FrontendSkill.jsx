import React from 'react'
import SkillTube from '../SkillTube/SkillTube'
import ReactIcon from '../Icon/React'
import NextjsIcon from '../Icon/NextjsIcon'
import FigmaIcon from '../Icon/Figma'

const FrontendSkill = () => {
    return (
        <div className='skillBox-container'>
            <h3>Frontend Skill</h3>
            <SkillTube icon={<ReactIcon />} name="React" value="85" />
            <SkillTube icon={<NextjsIcon />} name="NextJs" value="70" />
            <SkillTube icon={<FigmaIcon />} name="UI/UX" value="90" />
        </div>
    )
}

export default FrontendSkill