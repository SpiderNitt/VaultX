const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const axios = require('axios');
const Binance = require('node-binance-api');

const stripe = Stripe('sk_test_51Pk7RcJWc1zagewB2RWOyTU9bQK2qJFwLWS4gIzH6toySAvLcInXBs2o0F4htylWABHhBPHiDrehODHBmoWMwnKt00smDV7cpo');
const app = express();


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

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

 
 

 
