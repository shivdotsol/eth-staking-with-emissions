import { http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
// import { injected, walletConnect } from 'wagmi/connectors';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

export const config = getDefaultConfig({
  appName: 'ETH Staking dApp',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID',
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});