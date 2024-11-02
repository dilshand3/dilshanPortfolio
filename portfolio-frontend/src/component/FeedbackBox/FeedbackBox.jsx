"use client"
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../store/useAuth';
import './FeedbackBox.css';

const FeedbackBox = () => {
    const [feedbacks, setFeedbacks] = useState([])
    const { fetchAllFeedback, deleteFeedback } = useAuth()

    const loadFeedbacks = async () => {
        const data = await fetchAllFeedback();
        setFeedbacks(data);
    };

    useEffect(() => {
        loadFeedbacks();
    }, [fetchAllFeedback, loadFeedbacks]);

    const handleDelete = async (feedbackId) => {
        await deleteFeedback(feedbackId)
        setFeedbacks(feedbacks.filter(feedback => feedback.id !== feedbackId))
        loadFeedbacks();
    }

    return (
        <div>
            {feedbacks.map((feedback, _id) => (
                <div key={_id}>
                    <p className='AdminFeedback'>
                        <strong>{feedback.name}:</strong> <p>{feedback.feedback}</p> 
                        <span className="material-symbols-outlined dlt-feedback" onClick={() => handleDelete(feedback._id)}>
                            delete
                        </span>
                    </p>
                </div>
            ))}
        </div>
    )
}

export default FeedbackBox
