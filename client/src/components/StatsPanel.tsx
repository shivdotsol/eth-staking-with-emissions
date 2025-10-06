import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { formatEther } from "viem";
import { Coins, Gift, Loader2, TrendingUp } from "lucide-react";
import {
  STAKING_CONTRACT_ADDRESS,
  STAKING_CONTRACT_ABI,
} from "../contracts/stakingContract";
export function StatsPanel() {
  const { address } = useAccount();
  const { data: stakedValue } = useReadContract({
    address: STAKING_CONTRACT_ADDRESS,
    account: address,
    abi: STAKING_CONTRACT_ABI,
    functionName: "getStakedValue",
  });

  const { data: availableRewards } = useReadContract({
    address: STAKING_CONTRACT_ADDRESS,
    abi: STAKING_CONTRACT_ABI,
    account: address,
    functionName: "getAvailableReward",
  });

  const { writeContract: claimRewards, isPending: isClaimLoading } =
    useWriteContract();

  const stakedValueFormatted = stakedValue
    ? formatEther(stakedValue as bigint)
    : "0.00";

  const availableRewardsFormatted = availableRewards
    ? formatEther(availableRewards as bigint)
    : "0.00";

  const stats = [
    {
      icon: Coins,
      label: "Current Staked Amount",
      value: `${parseFloat(stakedValueFormatted).toFixed(5)} ETH`,
      color: "from-emerald-600 to-green-500",
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      show: !!address,
    },
    {
      icon: TrendingUp,
      label: "Available Rewards",
      value: `${parseFloat(availableRewardsFormatted).toFixed(5)} RWD`,
      color: "from-yellow-300 to-yellow-700",
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-400",
      show: !!address,
    },
  ];

  const handleClaim = async () => {
    try {
      claimRewards({
        address: STAKING_CONTRACT_ADDRESS,
        abi: STAKING_CONTRACT_ABI,
        functionName: "claimReward",
        account: address,
      });
    } catch {
      alert("error while claiming rewards.");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats
        .filter((stat) => stat.show)
        .map((stat, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className={`inline-flex p-3 rounded-xl ${stat.bgColor} mb-4`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-400">{stat.label}</p>
              <p
                className={`text-2xl font-bold bg-gradient-to-r ${stat.color} text-transparent bg-clip-text`}
              >
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8 shadow-xl">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <Gift className="w-7 h-7 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">
                  Claim your earned tokens
                </p>
              </div>
            </div>

            <button
              onClick={handleClaim}
              disabled={isClaimLoading}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-600 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              {isClaimLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Gift className="w-5 h-5" />
                  Claim Rewards
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
