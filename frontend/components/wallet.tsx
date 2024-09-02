"use client";
import React, { FC, useMemo, ReactNode } from "react";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";

interface WalletProps {
  children?: ReactNode;
}

const WalletButtons: FC = () => {
  const { connected } = useWallet();

  return (
    <div className="fixed right-4 z-20 flex justify-end space-x-2">
      {!connected && <WalletMultiButton className="btn btn-primary" />}
      {connected && <WalletDisconnectButton className="btn btn-secondary" />}
    </div>
  );
};

export const Wallet: FC<WalletProps> = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletButtons />
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
