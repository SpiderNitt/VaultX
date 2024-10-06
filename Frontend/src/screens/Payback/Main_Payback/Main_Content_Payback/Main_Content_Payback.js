import axios from 'axios';
import './Main_Content_Payback.css'
import { Connection,clusterApiUrl,Transaction,SystemProgram,PublicKey,LAMPORTS_PER_SOL } from "@solana/web3.js";


 


const Main_Content_Payback=()=>{
  return(
    <div className="Main_Content_Payback_scrollable_container">
            <div className="App">
  <h1>Crypto Payback Platform</h1>
</div>
</div>
  )
}


export default Main_Content_Payback;







const connectWallet = async () => {
  try {
      const { solana } = window;
      if (solana && solana.isPhantom) {
          const response = await solana.connect();
          console.log("Connected to wallet:", response.publicKey.toString());
          return response.publicKey;
      } else {
          alert("Solana wallet not found. Please install Phantom wallet.");
      }
  } catch (error) {
      console.error("Wallet connection error:", error);
  }
};



const sendTransaction = async (recipient, amount) => {

    try{
    const post = {
      userid:"saasd", //@todo:this has to come from the us
  };
    axios
    .post(
        'http://localhost:5000/payback',
        { post }
    )
    .then((res) => {
        console.log(res) //res.data.toSend,payAmt
        payeeData = res.data

    });
  } catch{
    console.log('error')
  }

  try {
      const { solana } = window;
      const connection = new Connection(clusterApiUrl("mainnet-beta"));

      const sender = solana.publicKey;
      const transaction = new Transaction().add(
          SystemProgram.transfer({
              fromPubkey: sender,
              toPubkey: new PublicKey(payeeData.toSend),
              lamports: LAMPORTS_PER_SOL * parseInt(payeeData.payAmt),
          })
      );

      const signature = await solana.signAndSendTransaction(transaction);
      console.log("Transaction signature:", signature);

      return { signature, connection };
  } catch (error) {
      console.error("Transaction error:", error);
  }
};

const monitorTransactionStatus = (connection, signature) => {
  const intervalId = setInterval(async () => {
      try {
          const status = await connection.getSignatureStatus(signature);
          const confirmationStatus = status.value?.confirmationStatus;

          if (confirmationStatus === 'confirmed' || confirmationStatus === 'finalized') {
              console.log("Transaction confirmed!");
              clearInterval(intervalId);
          } else {
              console.log(`Transaction status: ${confirmationStatus}`);
          }
      } catch (error) {
          console.error("Error checking transaction status:", error);
      }
  }, 5000);
};

// document.getElementById("payButton").addEventListener("click", async () => { // payButton ID is used here
//   const recipient = "RecipientPublicKeyHere";
//   const amount = 0.1;

//   const wallet = await connectWallet();
//   if (wallet) {
//       const { signature, connection } = await sendTransaction(recipient, amount);
//       monitorTransactionStatus(connection, signature);
//   }
// });


