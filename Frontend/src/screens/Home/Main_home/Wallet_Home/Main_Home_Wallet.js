import React from "react";
import './Main_Home_Wallet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons'; 
import {selectedOption} from '../Main_Content_Home/Main_Content_Home'

const Main_Home_Wallet = () => {
    return (
        <div className="Main_Home_Wallet">
            <text className="Main_Home_Wallet_Heading">Wallet Address:</text> 
            <br></br>
            <div className="Main_Home_Wallet_Box">
                <div className="Main_Home_Wallet_Box_Header">
                    <text className="Main_Home_Wallet_Sub_Heading_Left"> Address</text>
                    <a href="#"><FontAwesomeIcon className="Main_Home_Wallet_Sub_Heading_Right" icon={faCopy} /></a>
                </div>
                <span className="Main_Home_Wallet_Address_Text">Here is your wallet address.</span> 
            </div>
        </div>
    );
};

export default Main_Home_Wallet;
