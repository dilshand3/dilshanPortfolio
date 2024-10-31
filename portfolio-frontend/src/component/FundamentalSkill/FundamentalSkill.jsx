import React from 'react'
import SkillTube from '../SkillTube/SkillTube'
import EnglishIcon from '../Icon/EnglishIcon'
import MSoffice from '../Icon/MSoffice'
import DSA from '../Icon/DSA'
const FundamentalSkill = () => {
  return (
    <>
      <div className='skillBox-container'>
        <h3>Fundamental Skill</h3>
        <SkillTube icon={<MSoffice />} name="MS Office" value="80" />
        <SkillTube icon={<DSA />} name="DSA" value="76" />
        <SkillTube icon={<EnglishIcon />} name="English" value="80" />
      </div>
    </>
  )
}

export default FundamentalSkill