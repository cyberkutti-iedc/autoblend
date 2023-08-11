// FeedbackPage.js

import React, { useState } from 'react';
import firebase from "firebase/compat/app"; // Update the import path
import "firebase/compat/database";
import 'firebase/auth'; // Make sure to include other necessary Firebase modules
import '../css/feedback.css'
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAn3SjP8Mr3zb2CevB7BqviscaOlSWkTI0",
    authDomain: "autoblend-aecac.firebaseapp.com",
    databaseURL: "https://autoblend-aecac-default-rtdb.firebaseio.com",
    projectId: "autoblend-aecac",
    storageBucket: "autoblend-aecac.appspot.com",
    messagingSenderId: "400824416363",
    appId: "1:400824416363:web:8d8218e91fa0f75850192e"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedbackData = {
      rating,
      comment,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    };

    const db = firebase.database();
    await db.ref('feedbacks').push(feedbackData);

    setSubmitted(true);
  };

  return (
    <div className="feedback-container">
      <h2>Give Feedback</h2>
      {submitted ? (
        <div className="feedback-thankyou">
          <p>Thank you for your feedback and for purchasing our drinks!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Rating:</label>
            <div className="rating">
              {[1, 2, 3, 4, 5].map((value) => (
                <label key={value}>
                  <input
                    type="radio"
                    value={value}
                    checked={rating === value}
                    onChange={() => setRating(value)}
                  />
                  <span className="rating-circle">{value}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label>Comment:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <button type="submit">Submit Feedback</button>
        </form>
      )}
    </div>
  );
};

export default FeedbackPage;
