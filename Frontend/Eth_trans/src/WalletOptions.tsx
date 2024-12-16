import React from 'react';
import { useConnect } from 'wagmi';
import './styles.css';

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return (
    <div className="wallet-options">
      <h2>Connect Wallet</h2>
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          className="wallet-button"
          onClick={() => connect({ connector })}
        >
          {connector.name}
        </button>
      ))}
    </div>
  );
}
