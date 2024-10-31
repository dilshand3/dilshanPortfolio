'use client'
import React, { useState } from 'react'
import { useAuth } from '../../store/useAuth'
import './Addproject.css'
import { Toaster, toast } from 'react-hot-toast';


const Addproject = () => {
  const { addProject, isSubmitting, AllProject } = useAuth()
  const [formData, setFormData] = useState({
    projectname: '',
    githubURL: '',
    projectURL: '',
    projectCategory: ''
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataObj = new FormData(e.target);
    addProject(formDataObj, () => {
      toast.success("Project Added Successfully");
      setFormData({
        projectname: '',
        githubURL: '',
        projectURL: '',
        projectCategory: ''
      });
      e.target.reset();
      AllProject();
    });
  };


  return (
    <>
      <div className="project-form">
        <h1>Add New Project</h1>
        <form onSubmit={handleSubmit}>
          <input className='project-input' name='projectname' type="text" placeholder="Project Name" required value={formData.projectname} onChange={(e) => setFormData({ ...formData, projectname: e.target.value })} />
          <input className='project-input' name='githubURL' type='text' placeholder="GitHub Project URL" required value={formData.githubURL} onChange={(e) => setFormData({ ...formData, githubURL: e.target.value })} />
          <input className='project-input' name='projectURL' type="text" placeholder='Live Project URL' required value={formData.projectURL} onChange={(e) => setFormData({ ...formData, projectURL: e.target.value })} />
          <input className='project-input' name='projectImg' type="file" placeholder="Project Image" required />
          <select className='project-input' name='projectCategory' required value={formData.projectCategory} onChange={(e) => setFormData({ ...formData, projectCategory: e.target.value })}>
            <option value="">Select Category</option>
            <option value="app">App</option>
            <option value="website">MERN</option>
            <option value="uiux">UI/UX</option>
          </select>
          <button type="submit" disabled={isSubmitting} className='AddProjectBtn'>Add Project</button>
        </form>
      </div>
      <Toaster />
    </>
  )
}

export default Addproject
