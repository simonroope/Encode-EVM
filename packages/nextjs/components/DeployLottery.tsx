import { useEffect, useState } from "react";
import Lottery from "@contracts/Lottery.json";
import { notification } from "@utils/scaffold-eth";
import {Hex, parseEther} from "viem";
import { useAccount, useDeployContract } from "wagmi";

export const DeployLottery = () => {
  const { address, isConnected } = useAccount();
  const { deployContract, data, error: deploymentError, isSuccess } = useDeployContract();
  const [mounted, setMounted] = useState(false);
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [purchaseRatio, setPurchaseRatio] = useState(1);
  const [betPrice, setBetPrice] = useState(1);
  const [betFee, setBetFee] = useState(0.2);
  const [loading, setLoading] = useState(false);
  console.log(
    "DeployLottery -> init -> mounted",
    mounted,
    "loading",
    loading,
    "token",
    tokenName,
    tokenSymbol,
    purchaseRatio,
    betPrice,
    betFee,
  );

  useEffect(() => {
    if (isConnected) {
      setMounted(true);
    }
  }, [isConnected]);

  const deployLottery = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!window.ethereum || address === null) {
      notification.error("Please connect to a wallet to deploy the lottery contract.");
      return;
    }

    if (tokenName.trim() === "" || tokenSymbol.trim() === "" || purchaseRatio <= 0 || betPrice <= 0 || betFee <= 0) {
      notification.error("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      const lotteryContract = deployContract({
        abi: Lottery.abi,
        args: [
          tokenName,
          tokenSymbol,
          parseEther(String(purchaseRatio)),
          parseEther(String(betPrice)),
          parseEther(String(betFee)),
        ],
        bytecode: Lottery.bytecode as Hex,
      });
      console.log(
        "DeployLottery -> deployLottery -> lotteryContract:",
        lotteryContract,
        "isSuccess:",
        isSuccess,
        "error",
        deploymentError,
        "data",
        data,
      );
      notification.success("Lottery contract deployed successfully.");
    } catch (error) {
      console.error("Error deploying contract:", error);
      notification.error("Deployment failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center p-4">
      <form onSubmit={deployLottery} className="w-full max-w-md space-y-4">
        <label className="input input-bordered flex items-center gap-2">
          Name
          <input
            type="text"
            placeholder="Token Name"
            value={tokenName}
            onChange={e => setTokenName(e.target.value)}
            required
            className="grow"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Symbol
          <input
            type="text"
            placeholder="Token Symbol"
            value={tokenSymbol}
            onChange={e => setTokenSymbol(e.target.value)}
            required
            className="grow"
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Purchase Ratio</span>
            <span className="label-text-alt">ETH Value</span>
          </div>
          <input
            type="number"
            placeholder="Purchase Ratio"
            value={purchaseRatio}
            onChange={e => setPurchaseRatio(Number(e.target.value))}
            required
            className="input input-bordered w-full max-w-xs"
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Best Price</span>
            <span className="label-text-alt">ETH Value</span>
          </div>
          <input
            type="number"
            placeholder="Bet Price"
            value={betPrice}
            onChange={e => setBetPrice(Number(e.target.value))}
            required
            className="input input-bordered w-full max-w-xs"
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Best Fee</span>
            <span className="label-text-alt">ETH Value</span>
          </div>
          <input
            type="number"
            placeholder="Bet Fee"
            value={betFee}
            onChange={e => setBetFee(Number(e.target.value))}
            required
            className="input input-bordered w-full max-w-xs"
          />
        </label>

        <button type="submit" disabled={loading} className="btn w-full">
          {loading ? <span className="loading loading-spinner"></span> : "Deploy Lottery Contract"}
        </button>
      </form>
    </div>
  );
};
