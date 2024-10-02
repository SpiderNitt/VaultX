import React, { useEffect } from "react";
import { auth } from "../../firebaseConfig"; 
import { signOut } from "firebase/auth";

const SignOut = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("You have logged out successfully."); 
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  useEffect(() => {
    handleLogout(); 
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>You have been logged out.</h1>
      <p>Thank you for visiting. Come back soon!</p>
    </div>
  );
};

export default SignOut;
