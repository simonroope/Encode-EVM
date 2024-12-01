import { useEffect, useState } from "react";
import { useScaffoldReadContract } from "@hooks/scaffold-eth";
import { useAccount } from "wagmi";

export const LotteryInfo = () => {
  const { isConnected, chainId } = useAccount();
  const [mounted, setMounted] = useState(false);
  console.log("LotteryInfo -> init -> isConnected", isConnected, "chainId", chainId, "mounted", mounted);

  useEffect(() => {
    if (isConnected) {
      setMounted(true);
    }
  }, [isConnected]);

  const { data: purchaseRatio } = useScaffoldReadContract({
    contractName: "Lottery",
    functionName: "purchaseRatio",
    args: [],
  });
  const { data: betPrice } = useScaffoldReadContract({
    contractName: "Lottery",
    functionName: "betPrice",
    args: [],
  });
  const { data: betFee } = useScaffoldReadContract({
    contractName: "Lottery",
    functionName: "betFee",
    args: [],
  });
  console.log("LotteryInfo -> purchaseRatio", purchaseRatio, "betPrice", betPrice, "betFee", betFee);

  if (!mounted || !isConnected || !chainId) return null;

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-xl font-bold">Lottery Details</h2>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Purchase Ratio</span>
          <span className="label-text-alt">ETH</span>
        </div>
        <code className="flex-1 block whitespace-pre overflow-none text-left bg-base-200 p-2 rounded-md">
          {purchaseRatio}
        </code>
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Bet Price</span>
          <span className="label-text-alt">ETH</span>
        </div>
        <code className="flex-1 block whitespace-pre overflow-none text-left bg-base-200 p-2 rounded-md">
          {betPrice}
        </code>
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Bet Fee</span>
          <span className="label-text-alt">ETH</span>
        </div>
        <code className="flex-1 block whitespace-pre overflow-none text-left bg-base-200 p-2 rounded-md">{betFee}</code>
      </label>
    </div>
  );
};
