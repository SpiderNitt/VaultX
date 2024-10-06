import React from "react";
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Main_Home_File from './screens/Main_Screen_Files/Main_Home_File'
import Main_Account_File from "./screens/Main_Screen_Files/Main_Accont_File";
import Main_Cashback_File from "./screens/Main_Screen_Files/Main_Cashback_File";
import Main_Lending_File from "./screens/Main_Screen_Files/Main_Lending_File";
import Main_Payback_File from "./screens/Main_Screen_Files/Main_Payback_File";
import Main_Login_File from "./screens/Main_Screen_Files/Main_Login_file";
import Main_Signup_File from "./screens/Main_Screen_Files/Main_Signup_File";
import Main_Signout_File from './screens/Main_Screen_Files/Main_Signout_File'

const App=()=>{
  return(
    <Router>  
      <Routes>
        <Route path="/" element={<Main_Home_File />} />
        <Route path="/cashback" element={<Main_Cashback_File />} />
        <Route path="/payback" element={<Main_Payback_File />} />
        <Route path="/lending" element={<Main_Lending_File />} />
        <Route path="/account" element={<Main_Account_File />} />
        <Route path="/login" element={<Main_Login_File />} />
        <Route path="/signup" element={<Main_Signup_File />} />
        <Route path="/signout" element={<Main_Signout_File />} />
      </Routes>
    </Router>
  );
};

export default App;