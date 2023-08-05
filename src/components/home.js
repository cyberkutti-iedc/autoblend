import React from 'react';
import { Link } from 'react-router-dom';
import '../css/home.css'; // Create a Home.css file for styling

const Home = () => {
  return (
    <div className="home-container">
      <div className="title-container">
        <h1 className="main-title">Autoblend</h1>
        <h2 className="sub-title">Delicious & Healthy Drinks</h2>
      </div>
      <div className="description-container">
        <p className="description">
          Welcome to Autoblend, where taste and health blend together to bring you a refreshing experience. Our drinks
          are made from the freshest ingredients, carefully curated to tantalize your taste buds and boost your
          well-being.
        </p>
        <Link to="/products">
          <button className="explore-button">View Products</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
