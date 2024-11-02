"use client"
import React, { useEffect, useState } from 'react';
import "./AdminImg.css"
import { useAuth } from '@/store/useAuth';
import Image from 'next/image';

const AdminImg = () => {
  const [selectedFiles, setSelectedFiles] = useState({});
  const { shareAdmin, uploadProfileImage, uploadAboutImage, uploadCV, adminData } = useAuth();

  useEffect(() => {
    shareAdmin();
  }, [shareAdmin])

  const handleFileSelect = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFiles((prevFiles) => ({ ...prevFiles, [type]: file }));
    }
  };

  const handleUpload = async (type, uploadFunction) => {
    const file = selectedFiles[type];
    if (file) {
      await uploadFunction(file);
      shareAdmin();
    }
  };

  return (
    <div className="AdminImgContainer">
      <div className="AdminImg">
        <div className="AdminImgContainer">
          <div className="AdminImg-container">
            <Image src={adminData?.data[0]?.ProfileImg} alt="Profile" width={100} height={100} />
            <input type="file" accept="image/*" onChange={(e) => handleFileSelect(e, 'ProfileImg')} />
            <button className='AdminImgBtn' onClick={() => handleUpload('ProfileImg', uploadProfileImage)}>Upload ProfileImg</button>
          </div>
          <div className="AdminImg-container">
            <Image src={adminData?.data[0]?.AboutImg} alt="About" width={100} height={100} />
            <input type="file" accept="image/*" onChange={(e) => handleFileSelect(e, 'AboutImg')} />
            <button className='AdminImgBtn' onClick={() => handleUpload('AboutImg', uploadAboutImage)}>Upload CoverImg</button>
          </div>
          <div className="AdminImg-container">
            <Image src={adminData?.data[0]?.myCV} alt="CV" width={100} height={100} />
            <input type="file" onChange={(e) => handleFileSelect(e, 'myCV')} />
            <button className='AdminImgBtn' onClick={() => handleUpload('myCV', uploadCV)}>Upload CV</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminImg;
