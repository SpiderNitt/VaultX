import React from "react";
import './Main_Signup.css'
import Main_Input_Signup from './Main_Input_Signup/Main_Input_Signup'
import Main_Social_Signup from './Main_Social_media_Signup/Main_Social_Signup'

const Main_Signup=()=>{
    return(
        <>
            <div className="Main_Signup_components">
                <Main_Social_Signup/>
                <Main_Input_Signup/>
            </div>
        </>
    )
}

export default Main_Signup;