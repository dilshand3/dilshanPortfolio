"use client"
import React, { useEffect } from 'react';
import { useAuth } from '@/store/useAuth';
import Image from 'next/image';
import Link from 'next/link';

const WebProject = () => {
    const { projects, AllProject } = useAuth();

    useEffect(() => {
        AllProject();
    }, []);

    return (
        <>
            <div className='UserProject'>
                {projects?.length > 0 ? (
                    projects
                        .filter(project => project.projectCategory === "website")
                        .map((project, index) => (
                            <div key={index} className="userProjctContent">
                                <Image src={project.projectImg} alt={project.projectname} height={100} width={100} className='userProjctImg' />
                                <div className="userProjectInfo">
                                    <h3>{project.projectname}</h3>
                                    <div className="UserProjectUrl">
                                        <Link href={project.projectURL} target='_blank'>See Demo</Link>
                                        <Link href={project.githubURL} target='_blank'>See Code</Link>
                                    </div>
                                </div>
                            </div>
                        ))
                ) : (
                    <p>No projects available.</p>
                )}
            </div>
        </>
    );
};

export default WebProject;
