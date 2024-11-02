"use client"
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/store/useAuth';
import "./Admin.css"
import { useRouter } from 'next/navigation';
import VerifyUserAdmin from '@/component/VerifyUser/VerifyUser.Admin';
import ProjectBox from '@/component/ProjectBox/ProjectBox';
import FeedbackBox from '@/component/FeedbackBox/FeedbackBox';
import AdminImg from '@/component/AdminImg/AdminImg.jsx';
import NonVerifyUserAdmin from '@/component/NonVerifyUser/NonVerifyUser.Admin';
import { toast,Toaster } from 'react-hot-toast';

const Page = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState(null);
  const [category, setActiveCategory] = useState("admin")
  const { checkAuth, logout } = useAuth();

  useEffect(() => {
    const verifyAuth = async () => {
      const authResult = await checkAuth();
      const { isAuthenticated, user } = authResult || {};

      if (user) {
        setUserDetails(user);
      }

      if (!isAuthenticated) {
        router.push('/');
        return;
      }

      if (user && !user.isAdmin) {
        router.push('/profile');
      }
    };

    verifyAuth();
  }, [checkAuth, router]);
  
  return (
    <>
    <div className='admin-container'>
      <div className="left-nav">
        <ul>
          <li className={category === "admin" ? "active" : ""} onClick={() => setActiveCategory("admin")}>
            <span className="material-symbols-outlined">person</span>
            <span className="category-text">Admin</span>
          </li>
          <li className={category === "user" ? "active" : ""} onClick={() => setActiveCategory("user")}>
            <span className="material-symbols-outlined">groups</span>
            <span className="category-text">User</span>
          </li>
          <li className={category === "skill" ? "active" : ""} onClick={() => setActiveCategory("skill")}>
            <span className="material-symbols-outlined">code</span>
            <span className="category-text">Skill</span>
          </li>
          <li className={category === "project" ? "active" : ""} onClick={() => setActiveCategory("project")}>
            <span className="material-symbols-outlined">integration_instructions</span>
            <span className="category-text">Project</span>
          </li>
          <li className={category === "feedback" ? "active" : ""} onClick={() => setActiveCategory("feedback")}>
            <span className="material-symbols-outlined">chat</span>
            <span className="category-text">Feedback</span>
          </li>
        </ul>
        <button className='admin-logout' onClick={() => logout(() => router.push("/"))}>
          <span className="material-symbols-outlined">logout</span>
          <span className="logout-text">Logout</span>
        </button>
      </div>
      <div className="admin-right-content">

        {category === "admin" && (
          <>
            <AdminImg/>
          </>
        )}
        {
          category === "user" && (
            <>
              <VerifyUserAdmin />
              <NonVerifyUserAdmin/>
            </>
          )
        }

        {
          category === "skill" && (
            <>
             Skill page Comming soon
            </>
          )
        }

        {
          category === "project" && (
            <>
              <ProjectBox />
            </>
          )
        }
        {
          category === "feedback" && (
            <>
              <FeedbackBox/>
            </>
          )
        }
      </div>
    </div>
    <Toaster/>
    </>
  )
}

export default Page
