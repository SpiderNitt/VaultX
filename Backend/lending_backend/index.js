// Import required libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Connection, clusterApiUrl, Keypair, LAMPORTS_PER_SOL } = require('@solana/web3.js');
const pool = require('./db'); 

const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = 5000;

const calculatelending = (amount) => {
  const lendingRate = 0.05; 
  return amount * lendingRate;
};

const sendlending = async (recipientWallet, amount) => {
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');


  const sender = Keypair.generate(); 
  await connection.requestAirdrop(sender.publicKey, LAMPORTS_PER_SOL);

  const transaction = await connection.requestAirdrop(recipientWallet, amount * LAMPORTS_PER_SOL);
  return transaction;
};


app.post('/lending', async (req, res) => {
  const { userId, amount, currency } = req.body;
  

  try {
    let lendingAmount=amount;
    let returnAmount=calculatelending(amount);

    const transactionResult = await pool.query(
      'INSERT INTO transactions (user_id, amount, currency, lending , sender , returnamt) VALUES ($1, $2, $3, $4 , $5 , $6) RETURNING *',
      [userId, amount, currency, lendingAmount , sender.publicKey() , returnAmount  ]
    );


    const userResult = await pool.query('SELECT solana_wallet FROM users WHERE id = $1', [userId]);
    const userWallet = userResult.rows[0].solana_wallet;

    if (userWallet) {
      await sendlending(userWallet, lendingAmount);
      await pool.query('INSERT INTO lending (user_id, lending_amount, status) VALUES ($1, $2, $3)', [userId, lendingAmount, 'completed']);
      res.status(200).json({ message: 'Transaction processed and lending sent!' });
    } else {
      res.status(400).json({ error: 'User wallet not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error processing transaction.' });
  }
});

app.post('/payback', async (req, res) => {
  const userid = req.body.userId 

  try{
    if (userid !== null) {
      //query database for sender and amount
      const userResult = await pool.query('SELECT sender,returnamt FROM transactions WHERE user_id = $1', [userid]);
      const sender = userResult.rows[0].sender;
      const amount = userResult.rows[0].returnamt;
  
      res.json({toSend:sender,payAmt:amount});
  
      
    }
  }catch (error) {
    res.status(500).json({ error: 'Error sending data.' });
  }

 
});






app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
