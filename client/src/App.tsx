import { ConnectButton } from "@rainbow-me/rainbowkit";
import { StatsPanel } from "./components/StatsPanel";
import { StakingPanel } from "./components/StakingPanel";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>

      <div className="relative">
        <header className="border-b border-slate-800/50 backdrop-blur-sm bg-slate-900/30">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl">
                  <img className="w-8 h-8" src="/eth-white.png" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
                    ETH Staking
                  </h1>
                  <p className="text-sm text-slate-400">
                    Earn rewards by staking your ETH
                  </p>
                </div>
              </div>
              <ConnectButton />
            </div>
          </div>
        </header>

        <div className="container mx-auto mt-5 px-4">
          <div className="w-fit px-4 py-2 rounded-xl border border-red-500/80 bg-red-500/20 text-red-500/80 text-sm">
            <b>Disclaimer:</b> This is a personal project made for learning
            purposes so it <b>does't actually stake your ETH</b> . You can claim
            our custom token as rewards for staking.
          </div>
          <div className="w-fit px-4 py-2 mt-2 rounded-xl border border-yellow-500/80 bg-yellow-500/20 text-yellow-500/80 text-sm">
            <b>Info:</b> This project works on the{" "}
            <b className="text-yellow-500/90">Sepolia Testnet</b> only. Please
            make sure your wallet is connected to the Sepolia Testnet.
          </div>
        </div>

        <main className="container mx-auto px-4 py-8 space-y-8">
          <StatsPanel />

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <StakingPanel />
            </div>
            <div className="lg:col-span-1">{/* <RewardsPanel /> */}</div>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold text-white mb-3">
              How It Works
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-blue-400">1</div>
                <h4 className="font-semibold text-white">Connect Wallet</h4>
                <p className="text-sm text-slate-400">
                  Connect your Ethereum wallet to get started
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-green-400">2</div>
                <h4 className="font-semibold text-white">Stake ETH</h4>
                <p className="text-sm text-slate-400">
                  Deposit your ETH to start earning rewards
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-orange-400">3</div>
                <h4 className="font-semibold text-white">Earn Tokens</h4>
                <p className="text-sm text-slate-400">
                  Receive reward tokens based on your stake
                </p>
              </div>
            </div>
          </div>
        </main>

        <footer>
          <div className="container mx-auto text-center text-slate-400 text-sm">
            <p>
              Stake your ETH and earn rewards. Always verify the contract
              address before staking.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
