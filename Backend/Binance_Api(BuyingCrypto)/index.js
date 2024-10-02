const express = require("express");
const axios = require('axios');
const crypto = require('crypto');

const app = express();


app.use(express.json());

const apiUrl = 'https://api.binance.com';


const apiKey = 'DMhrPkmX9LszRT1fpmYS7iGJk3FtUkFd3GJ1QAVd11Z0v4fqiwIWs9XTEYzGVD84';
const apiSecret = 'P0Phv3kJY6GzxZpSUadPb6eY4guKhVLuhwhXR4rmZvDLDSJOezgl7Ng9IGbtDuMP';


function createSignature(queryString, secret) {
  return crypto.createHmac('sha256', secret).update(queryString).digest('hex');
}


async function buySolana(quantity) {
  const endpoint = '/api/v3/order';
  const symbol = 'SOLUSDT';  
  const side = 'BUY';
  const type = 'MARKET';

  
  const timestamp = Date.now();
  const params = `symbol=${symbol}&side=${side}&type=${type}&quantity=${quantity}&timestamp=${timestamp}`;

  
  const signature = createSignature(params, apiSecret);

  try {
    
    const response = await axios.post(
      `${apiUrl}${endpoint}?${params}&signature=${signature}`,
      null, 
      {
        headers: {
          'X-MBX-APIKEY': apiKey
        }
      }
    );
    
    return response.data;  
  } catch (error) {
    
    if (error.response) {
      
      console.error('Binance API Error:', error.response.data);
      throw new Error(JSON.stringify(error.response.data));
    } else {
      
      console.error('Error placing order:', error.message);
      throw new Error('Failed to place order. Please check your API credentials and request.');
    }
  }
}


app.post('/buy', async (req, res) => {
  const { quantity } = req.body;  

  
  if (!quantity) {
    return res.status(400).json({ error: 'Quantity is required' });
  }

  try {
    const orderResponse = await buySolana(quantity);
    res.status(200).json({ message: 'Order placed successfully', orderResponse });
  } catch (error) {
    
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});


app.listen(3000, () => {
  console.log('Server running on port 3000');
});
