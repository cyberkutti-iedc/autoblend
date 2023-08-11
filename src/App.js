// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductPage from './components/ProductPage';
import ContactPage from './components/ContactPage';
import Navbar from './components/Navbar';
import AboutUsPage from './components/AboutUsPage';
import FeedbackPage from './components/FeedbackPage';

//import Footer from './components/footer';
import Home from './components/home';

import './css/styles.css';
import './css/Navbar.module.css';
import './css/popup.css';
//import './css/footer.module.css';
import './css/home.css';
import './css/AboutUs.css';
import './css/feedback.css';
 // <Footer />

//import "./css/Navbar.scss";
const App = () => {
return (
    <Router>
    
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
        </Routes>
      
      </div>
     
    </Router>
  );
};

export default App;
