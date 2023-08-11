import React from "react";
import "../css/AboutUs.css";

const AboutUs = () => {
  const instagramUrl = "https://www.instagram.com/iedc.snm/";

  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <h1>Welcome to AutoBlend</h1>
        <p>
          At AutoBlend, we are passionate about crafting the perfect blend of
          flavors for your refreshing drinks. Our IoT device Mojito Mixer/Juice
          Mixer Machine is designed to elevate your beverage experience to a new
          level of excellence.
        </p>
        <p>
          Our team of innovators, Chaithanya Raj, Sreeraj V Rajesh, Dheeraj K.K,
          and Sreelakshmi K.S, are on a mission to create something cool and
          exciting. We believe that every sip should be a delightful adventure.
          With AutoBlend, mixology becomes an art, and your taste buds are in
          for a treat.
        </p>
        <p>
          Our vision is to revolutionize the way you enjoy drinks at home or on
          the go. We are combining the latest IoT technology with top-notch
          design and user experience to bring you a product that not only looks
          great but also delivers on performance.
        </p>
        <p>
          Whether you're hosting a party or simply craving a cool beverage, let
          AutoBlend be your trusted companion. Sit back, relax, and let our
          Mojito Mixer work its magic, creating the perfect blend every time.
        </p>
        <p>Join us on this journey of taste, technology, and innovation.</p>
        
        <h2>Cheers to the Good Life!</h2>
        <div className="instagram-link">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-button"
          >
            Follow us on Instagram
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
