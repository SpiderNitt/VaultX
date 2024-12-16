
import { useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';
import './styles.css';

export function SendTransaction() {
  const { data: hash, sendTransaction } = useSendTransaction();

  async function sendTx() {
    const to = document.getElementById('to').value;
    const value = document.getElementById('value').value;
    sendTransaction({ to, value: parseEther(value) });
  }

  return (
    <div className="transaction-card">
      <h2>Send Transaction</h2>
      <input id="to" className="input-field" placeholder="Recipient Address" required />
      <input id="value" className="input-field" placeholder="Amount (ETH)" required />
      <button className="send-button" onClick={sendTx}>Send</button>
      {hash && <p className="transaction-hash">Transaction Hash: {hash}</p>}
    </div>
  );
}
