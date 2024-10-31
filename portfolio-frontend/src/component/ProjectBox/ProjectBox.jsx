import React, { useEffect } from 'react';
import "./Project.css";
import { useAuth } from '../../store/useAuth';
import Image from 'next/image';
import Link from 'next/link';
import Addproject from '@/component/AddProject/Addproject';
import { Toaster } from 'react-hot-toast';

const ProjectBox = () => {
  const { projects, AllProject, deleteProject } = useAuth();

  useEffect(() => {
    AllProject();
  }, [AllProject]);

  return (
    <>
      <Toaster />
      <Addproject />
      <div className='project-box'>
        {projects.map((project, index) => (
          <div key={index} className="project-item">
            <div className="project-content">
              <Image src={project.projectImg} alt={project.projectname} height={100} width={100} />
              <div className="project-info">
                <div className="project-details">
                  <h3>{project.projectname}</h3>
                  <Link href={project.projectURL} target='_blank'>Live Project</Link>
                  <Link href={project.githubURL} target='_blank'>See Code</Link>
                </div>
                <button
                  className="project-delete-btn"
                  onClick={() => deleteProject(project._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProjectBox;
