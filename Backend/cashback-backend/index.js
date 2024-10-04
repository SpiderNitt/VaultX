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

const calculateCashback = (amount) => {
  const cashbackRate = 0.05; 
  return amount * cashbackRate;
};

const sendCashback = async (recipientWallet, amount) => {
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');


  const sender = Keypair.generate(); 
  await connection.requestAirdrop(sender.publicKey, LAMPORTS_PER_SOL);

  const transaction = await connection.requestAirdrop(recipientWallet, amount * LAMPORTS_PER_SOL);
  return transaction;
};


app.post('/transaction', async (req, res) => {
  const { userId, amount, currency } = req.body;

  try {

    const cashbackAmount = calculateCashback(amount);


    const transactionResult = await pool.query(
      'INSERT INTO transactions (user_id, amount, currency, cashback) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, amount, currency, cashbackAmount]
    );


    const userResult = await pool.query('SELECT solana_wallet FROM users WHERE id = $1', [userId]);
    const userWallet = userResult.rows[0].solana_wallet;

    if (userWallet) {
      await sendCashback(userWallet, cashbackAmount);
      await pool.query('INSERT INTO cashback (user_id, cashback_amount, status) VALUES ($1, $2, $3)', [userId, cashbackAmount, 'completed']);
      res.status(200).json({ message: 'Transaction processed and cashback sent!' });
    } else {
      res.status(400).json({ error: 'User wallet not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error processing transaction.' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
