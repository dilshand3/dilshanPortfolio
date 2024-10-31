"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import "./profile.css";
import Footer from '@/pages/Footer/Footer';
import { useAuth } from '@/store/useAuth';

const Profile = () => {
    const router = useRouter();
    const { checkAuth, logout } = useAuth();
    const [userDetails, setUserDetails] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
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

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    return (
        <>
            <div className='profile-page'>
                <div className="profile-container">
                    <h2>User Dashboard</h2>
                    {userDetails ? (
                        <>
                            <div className="profile-information">
                                <h3>Profile Information</h3>
                                <p>Name: {userDetails.username}</p>
                                <p>Email: {userDetails.email}</p>
                            </div>
                            <div className="profile-information">
                                <h3>Account Activity</h3>
                                <p>Join Date: {formatDate(userDetails.createdAt)}</p>
                                <p>Last Login: {formatDate(userDetails.lastLogin)}</p>
                            </div>
                            <button className='logout-btn' onClick={() => logout(() => router.push('/'))}>Logout</button>
                        </>
                    ) : (
                        <div className="loader-container">
                            <div className="loader"></div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Profile;