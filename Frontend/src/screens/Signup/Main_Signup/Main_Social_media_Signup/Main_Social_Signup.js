import React from "react";
import './Main_Social_Signup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Link } from "react-router-dom";

const Main_Social_Signup = () => {
    return (
        <div className="Main_Social_Signup_OAuth_Box">
            <div className="Main_Social_Signup_main_Text">Or continue with</div>
            <div className="Main_Social_Signup_Icons_Box">
                <button className="Main_Social_Signup_GBtn">
                    <FontAwesomeIcon icon={faGoogle} size="2x" className="icon" />
                </button>
                <button className="Main_Social_Signup_ABtn">
                    <FontAwesomeIcon icon={faApple} size="2x" className="icon" />
                </button>
                <button className="Main_Social_Signup_FBtn">
                    <FontAwesomeIcon icon={faFacebook} size="2x" className="icon" />
                </button>
            </div>
                <text className="Main_Social_Signup_Register_Text">Already have an account?</text>
                <Link to="/login" className="Main_Social_Signup_Register_Btn_Text">Sign In now</Link>
        </div>
    );
};

export default Main_Social_Signup;
