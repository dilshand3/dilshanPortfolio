import React from 'react'
import SkillTube from '../SkillTube/SkillTube'
import Git from '../Icon/Git'
import Github from '../Icon/Github'
import ApiIcon from '../Icon/ApiIcon'

const GeneralSkill = () => {
  return (
    <div className='skillBox-container'>
      <h3>General Skill</h3>
      <SkillTube icon={<Git />} name="Git" value="90" />
      <SkillTube icon={<Github />} name="Github" value="90" />
      <SkillTube icon={<ApiIcon />} name="RESTful API" value="84" />
    </div>
  )
}

export default GeneralSkill