"use client";
import React, { useEffect } from 'react';
import Home1 from "@/pages/Home1/Home1";
import About from "@/pages/About/About";
import Service from "@/pages/Service/Service";
import Education from "@/pages/Education/Education";
import Skill from "@/pages/Skill/Skill";
import Footer from "@/pages/Footer/Footer";
import Contact from "@/pages/Contact/Contact";
import Project from "@/pages/Project/Project";
import { Toaster } from 'react-hot-toast';
import { useAuth } from '@/store/useAuth';
export default function Home() {
  const { shareAdmin, adminData } = useAuth();

  useEffect(() => {
    shareAdmin();
  }, [])

  return (
    <>
      <Home1 profileImg={adminData?.data[0]?.ProfileImg} myCV={adminData?.data[0]?.myCV} />
      <About aboutImg={adminData?.data[0]?.AboutImg} />
      <Education />
      <Service />
      <Skill /> 
      <Project />
      <Contact />
      <Footer />
      <Toaster/>
    </>
  );
}
