"use client"
import { useState, useEffect } from 'react';
import { useAuth } from '../../store/useAuth'; 
import "./VerifyUserAdmin.css"

const VerifyUserAdmin = () => {
    const { VerifyUser } = useAuth(); 
    const [Verifyuser, setVerifyuser] = useState([]);

    useEffect(() => {
        const fetchVerifiedUsers = async () => {
            const response = await VerifyUser();
            if (response) {
                setVerifyuser(response);
            }
        };
        fetchVerifiedUsers();
    }, [VerifyUser]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    return (
        <div className='VerifyUser'>
            {
                Verifyuser.map((user) => (
                    <div key={user._id} className="UserAdminContainer">
                        <h4>Name: {user.username}</h4>
                        <h5>Email: {user.email}</h5>
                        <h6>Number: {user.number}</h6>
                        <div className="user-data">
                            <small>Account CreatedAt: {formatDate(user.createdAt)}</small>
                            <small>Account LastLogin: {formatDate(user.lastLogin)}</small>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default VerifyUserAdmin