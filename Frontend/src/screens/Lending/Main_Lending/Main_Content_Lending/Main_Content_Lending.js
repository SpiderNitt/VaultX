import React, { useState } from 'react';
import axios from 'axios';
import './Main_Content_Lending.css'


// const [userId, setUserId] = useState('');
// const [amount, setAmount] = useState('');
// const [currency, setCurrency] = useState('USD');
// const [message, setMessage] = useState('');

let userId,amount,currency,message 

function setMessage(data){
    message=data
}
function setAmount(data){
    amount=data
}
function setCurrency(data){
    currency=data
}
function setUserId(data){
    userId=data
}

const handleTransaction = async () => {
  try {
    const response = await axios.post('http://localhost:5000/lending', {
      userId,
      amount: parseFloat(amount),
      currency,
    });

    setMessage(response.data.message);
  } catch (error) {
    setMessage(error.response ? error.response.data.error : 'An error occurred');
  }
};

const Main_Content_Lending=()=>{
    return(
        <div className="Main_Content_Lending_scrollable_container">
                <div className="App">
      <h1>Crypto Lending Platform</h1>

      <div>
        <label>User ID:</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>

      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div>
        <label>Currency:</label>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>

      <button onClick={handleTransaction}>Process Transaction</button>

      {message && <p>{message}</p>}
    </div>

        </div>
    )
}

export default Main_Content_Lending;