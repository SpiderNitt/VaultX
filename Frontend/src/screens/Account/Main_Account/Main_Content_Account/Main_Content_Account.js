import React from "react";
import './Main_Content_Account.css'

const Main_Content_Account=()=>{
    return(
        <div className="Main_Content_Account_scrollable_container">
            <div className="Main_Content_Account_container">
                <span className="Main_Content_Account_Transaction_Number">0.00000019 BTC</span>
                <span className="Main_Content_Account_Date_And_Time">25/09/2025 : 11:56</span>
                <button className="Main_Content_Account_Details_Btn">Details</button>
            </div>
            <div className="Main_Content_Account_container">
                <span className="Main_Content_Account_Transaction_Number">0.00000019 BTC</span>
                <span className="Main_Content_Account_Date_And_Time">25/09/2025 : 11:56</span>
                <button className="Main_Content_Account_Details_Btn">Details</button>
            </div>
            <div className="Main_Content_Account_container">
                <span className="Main_Content_Account_Transaction_Number">0.00000019 BTC</span>
                <span className="Main_Content_Account_Date_And_Time">25/09/2025 : 11:56</span>
                <button className="Main_Content_Account_Details_Btn">Details</button>
            </div>
        </div>
    )
}

export default Main_Content_Account;