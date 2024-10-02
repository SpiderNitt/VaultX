import Wallet from "./Wallet_Home/Main_Home_Wallet";
import MainContent from "./Main_Content_Home/Main_Content_Home";
import React from "react";
import './Main_Home.css'

const Main_Home=()=>{
    return(
        <>
            <div className="Main_home_Content">
                <MainContent/>
                <Wallet/>
            </div>
        </>
    )
}

export default Main_Home;