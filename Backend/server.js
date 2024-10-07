// Import required libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Connection, clusterApiUrl, Keypair, LAMPORTS_PER_SOL } = require('@solana/web3.js');
const Stripe = require('stripe');
const axios = require('axios');
const Binance = require('node-binance-api');

const stripe = Stripe('sk_test_51Pk7RcJWc1zagewB2RWOyTU9bQK2qJFwLWS4gIzH6toySAvLcInXBs2o0F4htylWABHhBPHiDrehODHBmoWMwnKt00smDV7cpo');
const pool = require('./db'); 


const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = 5000;

//stripe
app.use(cors({
  origin: 'http://localhost:3000',  
  methods: ['GET', 'POST'],
  credentials: true 
}));

app.use(express.json());

const binance = new Binance().options({
  APIKEY: 'DMhrPkmX9LszRT1fpmYS7iGJk3FtUkFd3GJ1QAVd11Z0v4fqiwIWs9XTEYzGVD84',
  APISECRET: 'P0Phv3kJY6GzxZpSUadPb6eY4guKhVLuhwhXR4rmZvDLDSJOezgl7Ng9IGbtDuMP'
});

app.post('/create-checkout-session', async (req, res) => {
  const { amount } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Buy Solana',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: 'Failed to create session' });
  }
});


app.post('/purchase-solana', async (req, res) => {
  const { fiatAmount, walletAddress } = req.body;

  try {
    const solPriceResponse = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT');
    const solPrice = parseFloat(solPriceResponse.data.price);

    const solAmount = (fiatAmount / solPrice).toFixed(6);

    binance.marketBuy('SOLUSDT', solAmount, (error, response) => {
      if (error) {
        console.error("Error buying Solana:", error.body);
        return res.status(500).json({ success: false });
      }

      console.log("Market Buy response", response);

     

      res.json({ success: true, solAmount });
    });
  } catch (error) {
    console.error("Error purchasing Solana:", error);
    res.status(500).json({ success: false });
  }
});

//cashback
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


//lending
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
  

  //subscription
  
// Middleware to parse JSON bodies
app.use(express.json());

// Variable to store interval ID
let intervalId = null;

// Function to be called periodically
function periodicFunction() {
  console.log('Periodic function called');
  //database request entry
  

}

// Endpoint to register the periodic function call
app.post('/register', (req, res) => {
  const interval = req.body.interval || 1000; // Default to 1 second if not provided

  // Clear any existing interval
  if (intervalId !== null) {
    clearInterval(intervalId);
  }

  // Set up new interval
  intervalId = setInterval(periodicFunction, interval);

  res.send(`Periodic function registered with interval ${interval} ms`);
});








app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
