import React, { useState } from "react";
import './Main_Content_Home.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"; 

const Main_Content_Home = () => {
  const [convertSelectedOption, setConvertSelectedOption] = useState("USD"); 
  const [enterSelectedOption, setEnterSelectedOption] = useState("USD"); 
  const [showDropdownConvert, setShowDropdownConvert] = useState(false);
  const [showDropdownEnter, setShowDropdownEnter] = useState(false);

  const handleOptionSelectConvert = (option) => {
    setConvertSelectedOption(option);  
    setShowDropdownConvert(false);     
  };

  const handleOptionSelectEnter = (option) => {
    setEnterSelectedOption(option)  
    setShowDropdownEnter(false)
  };

  return (
    <div className="Main_Content_Home">
      <span className="Main_Content_Home_Amt_Enter_Box">
        <span className="Main_Content_Home_Amt_Enter_Text">Enter Your Amount:</span>
        <input type="number" className="Main_Content_Home_Amt_Enter_Input" />
        <div className="Main_Content_Home_Enter_Box_Drop_Down_Container">
          <button className="Main_Content_Home_Enter_Box_Drop_Down_Btn" onClick={() => setShowDropdownEnter(!showDropdownEnter)}>
            {enterSelectedOption} <FontAwesomeIcon icon={faCaretDown} />
          </button>
          {showDropdownEnter && (
            <ul className="Main_Content_Home_Enter_Box_Drop_Down_Menu">
              <li onClick={() => handleOptionSelectEnter("Rs")}>Rs</li>
              <li onClick={() => handleOptionSelectEnter("USD")}>USD</li>
              <li onClick={() => handleOptionSelectEnter("Euro")}>Euro</li>
            </ul>
          )}
        </div>
      </span>
      <span className="Main_Content_Home_Convert_Box">
        <span className="Main_Content_Home_Convert_Box_Text">Convert into</span>
        <div className="Main_Content_Home_Convert_Box_Drop_Down_Container">
          <button className="Main_Content_Home_Convert_Box_Drop_Down_Btn" onClick={() => setShowDropdownConvert(!showDropdownConvert)}>
            {convertSelectedOption} <FontAwesomeIcon icon={faCaretDown} />
          </button>
          {showDropdownConvert && (
            <ul className="Main_Content_Home_Convert_Box_Drop_Down_Menu">
              <li onClick={() => handleOptionSelectConvert("USD")}>USD</li>
              <li onClick={() => handleOptionSelectConvert("Euro")}>Euro</li>
              <li onClick={() => handleOptionSelectConvert("Bitcoin")}>Bitcoin</li>
              <li onClick={() => handleOptionSelectConvert("Ethereum")}>Ethereum</li>
            </ul>
          )}
        </div>
        <input type="number" className="Main_Content_Home_Convert_Box_Convert_Drop_Down" />
      </span>
      <button className="Main_Content_Home_Proceed_Btn">Proceed for transaction</button>
    </div>
  );
};

export default Main_Content_Home;
