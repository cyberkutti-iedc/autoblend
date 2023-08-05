import React, { useState} from "react";
import firebase from "firebase/compat/app"; // Update the import path
import "firebase/compat/database";
import "../css/contactus.css";

const ContactPage = () => {
  // Replace with your Firebase configuration
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save the contact information to Firebase Realtime Database
    const database = firebase.database();
    const contactsRef = database.ref("contacts");
    contactsRef.push({
      name: name,
      email: email,
      message: message,
    });

    // Reset form fields after submission
    setName("");
    setEmail("");
    setMessage("");
    setIsSubmitted(true);
  };

  return (
    <div className="contact-container">
      <div className="contact-form">
        <h2>Contact Us</h2>
        {isSubmitted ? (
          <p>Thank you for your message. We will get back to you shortly.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
        )}

       
       </div>
    </div>
  );
};

export default ContactPage;
