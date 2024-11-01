import React from 'react'
import SkillTube from '../SkillTube/SkillTube'
import Node from '../Icon/Node'
import ExpressIcon from '../Icon/Express'
import MongoDb from '../Icon/MongoDb'

const BackendSkill = () => {
    return (
        <div className='skillBox-container'>
            <h3>Backend Skill</h3>
            <SkillTube icon={<Node />} name="NodeJs" value="85" />
            <SkillTube icon={<ExpressIcon />} name="Express" value="80" />
            <SkillTube icon={<MongoDb />} name="MongoDB" value="95" />
        </div>
    )
}

export default BackendSkill