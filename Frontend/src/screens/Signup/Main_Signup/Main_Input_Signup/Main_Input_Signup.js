import React, { useState } from "react";
import { auth } from "../../../../firebaseConfig"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import './Main_Input_Signup.css';

const Main_Input_Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSignup = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Sign Up Successful");
            setEmail("");
            setPassword("");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="Main_Input_Signup_Box">
            <div className="Main_Input_Signup_Email_Box">
                <div className="Main_Input_Signup_Email_Text">Email</div>
                <input
                    type="email"
                    className="Main_Input_Signup_Email_Input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="Main_Input_Signup_Password_Box">
                <div className="Main_Input_Signup_Password_Text">Set Password</div>
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
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                    </span>
                </div>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>} 
            <button className="Main_Input_Signup_Sign_In_Btn" onClick={handleSignup}>
                Sign Up
            </button>
        </div>
    );
};

export default Main_Input_Signup;
