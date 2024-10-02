import React from "react";
import './Main_Login.css'
import Main_Input_Login from "./Main_Input_Login/Main_Input_Login";
import Main_Social_Login from './Main_Social_media_Login/Main_Social_Login'

const Main_Login=()=>{
    return(
        <>
            <div className="Main_Login_Box">
                <Main_Social_Login/>
                <Main_Input_Login/>
            </div>
        </>
    )
}

export default Main_Login;