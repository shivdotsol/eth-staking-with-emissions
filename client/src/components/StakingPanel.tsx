import { useState } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseEther } from "viem";
import { ArrowDownCircle, ArrowUpCircle, Loader2 } from "lucide-react";
import {
  STAKING_CONTRACT_ADDRESS,
  STAKING_CONTRACT_ABI,
} from "../contracts/stakingContract";

export function StakingPanel() {
  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const { address } = useAccount();

  const {
    data: stakeHash,
    writeContract: stake,
    isPending: isStakePending,
  } = useWriteContract();

  const {
    data: unstakeHash,
    writeContract: unstake,
    isPending: isUnstakePending,
  } = useWriteContract();

  const { isLoading: isStakeConfirming } = useWaitForTransactionReceipt({
    hash: stakeHash,
  });

  const { isLoading: isUnstakeConfirming } = useWaitForTransactionReceipt({
    hash: unstakeHash,
  });

  const handleStake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) return;

    try {
      stake({
        address: STAKING_CONTRACT_ADDRESS,
        abi: STAKING_CONTRACT_ABI,
        functionName: "stake",
        value: parseEther(stakeAmount),
      });
    } catch (error) {
      console.error("Stake error:", error);
    }
  };

  const handleUnstake = async () => {
    if (!unstakeAmount || parseFloat(unstakeAmount) <= 0) return;

    try {
      unstake({
        address: STAKING_CONTRACT_ADDRESS,
        abi: STAKING_CONTRACT_ABI,
        functionName: "unStake",
        args: [parseEther(unstakeAmount)],
      });
    } catch (error) {
      console.error("Unstake error:", error);
    }
  };

  if (!address) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 text-center">
        <p className="text-slate-400 text-lg">
          Connect your wallet to start staking
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-500/10 rounded-lg">
            <ArrowUpCircle className="w-6 h-6  text-green-500" />
          </div>
          <h3 className="text-xl font-bold text-white">Stake ETH</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Amount (ETH)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.0"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
            />
          </div>

          <button
            onClick={handleStake}
            disabled={isStakePending || isStakeConfirming || !stakeAmount}
            className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-600 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            {isStakePending || isStakeConfirming ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {isStakePending ? "Confirming..." : "Processing..."}
              </>
            ) : (
              "Stake ETH"
            )}
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-orange-500/10 rounded-lg">
            <ArrowDownCircle className="w-6 h-6 text-orange-500" />
          </div>
          <h3 className="text-xl font-bold text-white">Unstake ETH</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Amount (ETH)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.0"
              value={unstakeAmount}
              onChange={(e) => setUnstakeAmount(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
            />
          </div>

          <button
            onClick={handleUnstake}
            disabled={isUnstakePending || isUnstakeConfirming || !unstakeAmount}
            className="w-full px-6 py-3 bg-gradient-to-r from-orange-600 to-red-500 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-red-600 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            {isUnstakePending || isUnstakeConfirming ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {isUnstakePending ? "Confirming..." : "Processing..."}
              </>
            ) : (
              "Unstake ETH"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
