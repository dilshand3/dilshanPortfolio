"use client"
import { useState, useEffect } from 'react';
import { useAuth } from '../../store/useAuth'; 
import "../VerifyUser/VerifyUserAdmin.css" 

const NonVerifyUserAdmin = () => {
    const { NonVerifyUser } = useAuth(); 
    const [nonVerifyUsers, setNonVerifyUsers] = useState([]);

    useEffect(() => {
        const fetchNonVerifiedUsers = async () => {
            const response = await NonVerifyUser();
            if (response) {
                setNonVerifyUsers(response);
            }
        };
        fetchNonVerifiedUsers();
    }, [NonVerifyUser]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    return (
        <>
        <h2>Non Verify User</h2>
         <div className='VerifyUser'>
            {
                nonVerifyUsers.map((user) => (
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
        </>
       
    )
}

export default NonVerifyUserAdmin 