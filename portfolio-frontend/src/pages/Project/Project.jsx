"use client"
import React, { useState } from 'react'
import { useInView } from 'react-intersection-observer';
import "./Project.css"
import AllProject from '@/component/AllProject/AllProject';
import WebProject from '@/component/WebProject/WebProject';
import AppProject from '@/component/AppProject/AppProject';
import UIUX from '@/component/UIUX/UIUX';

const Project = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const { ref: allRef, inView: allInView } = useInView();
  const { ref: webRef, inView: webInView } = useInView();
  const { ref: appsRef, inView: appsInView } = useInView();
  const { ref: uiuxRef, inView: uiuxInView } = useInView();

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className='project' id='project'>
      <small>What I&apos;ve done</small>
      <h2>Recent Works</h2>
      <div className="button-container">
        <button
          className={activeCategory === 'all' ? 'active' : ''}
          onClick={() => handleCategoryChange('all')}
        >
          All</button>
        <button
          className={activeCategory === 'web-projects' ? 'active' : ''}
          onClick={() => handleCategoryChange('web-projects')}
        >
          Website
        </button>
        <button
          className={activeCategory === 'apps' ? 'active' : ''}
          onClick={() => handleCategoryChange('apps')}
        >
          Mobile Apps
        </button>
        <button
          className={activeCategory === 'ui-ux' ? 'active' : ''}
          onClick={() => handleCategoryChange('ui-ux')}
        >
          UI & UX
        </button>
      </div>
      <div className="project-container">
        {activeCategory === 'all' && (
          <div ref={allRef} className={`project-section ${allInView ? 'animate' : ''}`} id="all">
            <AllProject />
          </div>
        )}
        {activeCategory === 'web-projects' && (
          <div ref={webRef} className={`project-section ${webInView ? 'animate' : ''}`} id="web-projects">
            <WebProject />
          </div>
        )}
        {activeCategory === 'apps' && (
          <div ref={appsRef} className={`project-section ${appsInView ? 'animate' : ''}`} id="apps">
            <AppProject />
          </div>
        )}
        {activeCategory === 'ui-ux' && (
          <div ref={uiuxRef} className={`project-section ${uiuxInView ? 'animate' : ''}`} id="ui-ux">
            <UIUX />
          </div>
        )}
      </div>
    </div>
  )
}

export default Project