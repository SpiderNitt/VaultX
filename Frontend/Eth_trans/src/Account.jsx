
import { useAccount, useBalance, useDisconnect } from 'wagmi';
import './styles.css';

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const balance = useBalance({ address });

  return (
    <div className="account-card">
      {address ? (
        <>
          <div className="account-info">
            <p><strong>Your Address:</strong> {address}</p>
            <p><strong>Your Balance:</strong> {balance.data?.formatted || 'Loading...'}</p>
          </div>
          <button className="disconnect-button" onClick={() => disconnect()}>
            Disconnect
          </button>
        </>
      ) : (
        <p>No account connected</p>
      )}
    </div>
  );
}
