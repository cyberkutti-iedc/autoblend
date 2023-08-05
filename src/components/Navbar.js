import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/Navbar.module.css"; // Import your custom CSS module

const Navbar = () => {
  const navbarRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  // Function to handle scroll event
  const handleScroll = () => {
    if (window.innerWidth <= 768) {
      if (window.scrollY > 50) {
        navbarRef.current.classList.add(styles.scrolling);
      } else {
        navbarRef.current.classList.remove(styles.scrolling);
      }
    }
  };

  useEffect(() => {
    // Add event listener to handle scroll
    window.addEventListener("scroll", handleScroll);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to toggle the mobile menu
  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Function to close the mobile menu when a menu item is clicked
  const handleMenuItemClick = () => {
    setShowMenu(false);
  };

  return (
    <nav ref={navbarRef} className={`${styles.navbar} ${showMenu && styles.showMenu}`}>
      <div className={styles.logo}>
        <Link to="/">AutoBlend</Link>
      </div>
      <div className={styles.menuIcon} onClick={handleToggleMenu}>
        <div className={styles.menuLine}></div>
        <div className={styles.menuLine}></div>
        <div className={styles.menuLine}></div>
      </div>
      <ul className={`${styles.navLinks} ${showMenu && styles.showMenu}`}>
        <li>
          <Link to="/" onClick={handleMenuItemClick}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/products" onClick={handleMenuItemClick}>
            Products
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={handleMenuItemClick}>
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" onClick={handleMenuItemClick}>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
