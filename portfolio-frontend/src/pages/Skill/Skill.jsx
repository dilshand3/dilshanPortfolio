import React from 'react';
import './Skill.css';
import FrontendSkill from '../../component/FrontendSkill/FrontendSkill';
import BackendSkill from '../../component/Backend/Backend';
import GeneralSkill from '../../component/GeneralSkill/GeneralSkill';
import FundamentalSkill from '../../component/FundamentalSkill/FundamentalSkill';

const Skill = () => {
  return (
    <div className='skill' id='skill'>
      <small>My Abilities</small>
      <h2>My Experience</h2>
      <div className="skill-container animate">
        <FrontendSkill />
        <BackendSkill />
        <GeneralSkill />
        <FundamentalSkill />
      </div>
    </div>
  )
}

export default Skill
