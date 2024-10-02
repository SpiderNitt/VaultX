import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebaseConfig"; 
import { useNavigate } from "react-router-dom"; 
import './Main_Input_Login.css';

const Main_Input_Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setError(""); 
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/"); 
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <div className="Main_Input_Login_Box">
      <div className="Main_Input_Login_Box_Email_Box">
        <div className="Main_Input_Login_Box_Email_Text">Email</div>
        <input
          type="email"
          className="Main_Input_Login_Box_Email_Input"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>

      <div className="Main_Input_Login_Box_Password_Box">
        <div className="Main_Input_Login_Box_Password_Text">Password</div>
        <div className="Main_Input_Login_Box_Password_Input_Container">
          <input
            type={showPassword ? "text" : "password"}
            className="Main_Input_Login_Box_Password_Input"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          <span
            className="password-toggle-icon"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </span>
        </div>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button className="Main_Input_Login_Box_Forgot_Btn">
        Forgot Password?
      </button>
      <button className="Main_Input_Login_Box_Sign_In_Btn" onClick={handleLogin}>
        Sign In
      </button>
    </div>
  );
};

export default Main_Input_Login;
