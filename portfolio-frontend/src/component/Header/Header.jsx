"use client"
import { useAuth } from '@/store/useAuth';
import React, { useEffect } from 'react';
import Link from 'next/link';
import "./Header.css"

const Header = () => {
    const { userDetails, checkAuth, toggleAuthentication } = useAuth();

    useEffect(() => {
        const fetchAuth = async () => {
            const { isAuthenticated, user } = await checkAuth();
            if (!isAuthenticated) {
                return;
            }
        };

        fetchAuth();
    }, [checkAuth]);

    return (
        <>
            <header className='home-header'>
                <span className='home-header-title'>dilshan.d3</span>
                {userDetails ? (
                    <Link href={userDetails.isAdmin ? "/myadmin" : "/profile"}>
                        <p className='home-header-button'>{userDetails.isAdmin ? "Admin" : "Profile"}</p>
                    </Link>
                ) : (
                    <button className='home-header-button' onClick={toggleAuthentication}>
                        Sign Up
                    </button>
                )}
            </header>
        </>
    )
}

export default Header;
