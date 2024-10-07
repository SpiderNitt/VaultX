import React, { useState } from "react";
import './Main_Content_Home.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"; 
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_test_51Pk7RcJWc1zagewBHAxSoGdsn3h33QAf7KBPyz7OqGSqscPGERA4H6f33METWvLoMB7m1fpo10AFqPOkehwmRGo400DQQw1Iry'); 

const Main_Content_Home = () => {
  const [enterSelectedOption, setEnterSelectedOption] = useState("USD"); 
  const [fiatAmount, setFiatAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');

  const handleTransaction = async () => {
    if (!fiatAmount || !walletAddress) {
      alert("Please provide both fiat amount and Phantom wallet address.");
      return;
    }

    try {
      const stripe = await stripePromise;

      const response = await fetch('http://localhost:5000/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: fiatAmount * 100 })
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const session = await response.json();

      
      const result = await stripe.redirectToCheckout({ sessionId: session.id });
      if (result.error) {
        console.error("Error with Stripe checkout:", result.error.message);
        return;
      }

      
      const purchaseResponse = await fetch('http://localhost:5000/purchase-solana', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fiatAmount, walletAddress }),
      });

      if (!purchaseResponse.ok) {
        throw new Error("Failed to purchase Solana");
      }

      const purchaseResult = await purchaseResponse.json();

      if (purchaseResult.success) {
        alert(Success! ${purchaseResult.solAmount} SOL has been transferred to your Phantom wallet.);
      } else {
        alert("Failed to transfer SOL. Please try again.");
      }

    } catch (error) {
      console.error("Error during transaction:", error);
      alert("An error occurred during the transaction. Please try again.");
    }
  };

  return (
    <div className="Main_Content_Home">
      <span className="Main_Content_Home_Amt_Enter_Box">
        <span className="Main_Content_Home_Amt_Enter_Text">Enter Your Amount:</span>
        <input 
          type="number" 
          className="Main_Content_Home_Amt_Enter_Input" 
          value={fiatAmount} 
          onChange={(e) => setFiatAmount(e.target.value)} 
        />
      </span>
      <span className="Main_Content_Home_Wallet_Address_Box">
        <label>Enter Phantom Wallet Address:</label>
        <input 
          type="text" 
          placeholder="Your Phantom Wallet Address" 
          value={walletAddress} 
          onChange={(e) => setWalletAddress(e.target.value)} 
        />
      </span>
      <button className="Main_Content_Home_Proceed_Btn" onClick={handleTransaction}>
        Proceed for transaction
      </button>
    </div>
  );
};

export default Main_Content_Home;