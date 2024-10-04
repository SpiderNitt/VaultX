import React, { useEffect, useState } from "react";
import './Header.css';
import img from '../../images/user.png';
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Header_Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // state to control the dropdown visibility
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Toggle the dropdown menu when user icon is clicked
  const handleUserIconClick = () => {
    if (isLoggedIn) {
      setShowDropdown(!showDropdown); // Toggle dropdown if logged in
    } else {
      navigate("/login"); // Redirect to login if not logged in
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    await signOut(auth); // Sign out the user from Firebase
    setIsLoggedIn(false); // Update the state
    setShowDropdown(false); // Close dropdown after logging out
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="Header_Home_Box">
      <a href="#" className="Header_Home_Box_Logo_Btn">Logo</a>
      <span className="Header_Home_Box_Navigator_Btn_Box">
        <Link to="/" className="Header_Home_Box_Home_Btn">Home</Link>
        <a href="#" className="Header_Home_Box_Investment_Btn">Investment</a>
        <Link to="/cashback" className="Header_Home_Box_Investment_Btn">Cashback</Link>
        <a href="#" className="Header_Home_Box_About_Us_Btn">About Us</a>
        <a href="#" className="Header_Home_Box_Contact_Us_Btn">Contact Us</a>
      </span>
      <span className="Header_Home_Box_Home_Section_Box">
        {isLoggedIn && (
          <Link to="/account" className="Header_Home_Box_Home_Section_Box_Home_Btn">Account</Link>
        )}
        <span className="Header_Home_Box_Home_Section_Box_Profile_Btn" onClick={handleUserIconClick}>
          <img src={img} className="Header_Home_Box_Home_Section_Box_Image_Icon" alt="Profile" />
        </span>

        {/* Conditional rendering of dropdown menu */}
        {isLoggedIn && showDropdown && (
          <div className="dropdown-menu">
            <span className="dropdown-item" onClick={handleLogout}>Logout</span>
          </div>
        )}
      </span>
    </div>
  );
};

export default Header_Home;
