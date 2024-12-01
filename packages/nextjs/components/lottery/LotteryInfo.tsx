import { useEffect, useState } from "react";
import { useScaffoldReadContract } from "@hooks/scaffold-eth";
import { formatEther } from "viem";
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
  const { data: prizePool } = useScaffoldReadContract({
    contractName: "Lottery",
    functionName: "prizePool",
    args: [],
  });
  const { data: ownerPool } = useScaffoldReadContract({
    contractName: "Lottery",
    functionName: "ownerPool",
    args: [],
  });
  const { data: betsOpen } = useScaffoldReadContract({
    contractName: "Lottery",
    functionName: "betsOpen",
    args: [],
  });
  const { data: betsClosingTime } = useScaffoldReadContract({
    contractName: "Lottery",
    functionName: "betsClosingTime",
    args: [],
  });
  console.log(
    "LotteryInfo -> purchaseRatio",
    purchaseRatio,
    "betPrice",
    betPrice,
    "betFee",
    betFee,
    "prizePool",
    prizePool,
    "ownerPool",
    ownerPool,
    "betsOpen",
    betsOpen,
    "betsClosingTime",
    betsClosingTime,
  );

  if (!mounted || !isConnected || !chainId) return null;

  const renderLabelAndValue = <T extends bigint | boolean>(label: string, label2: string, value: T) => {
    return (
      <label className="form-control w-1/3 p-2">
        <div className="label">
          <span className="label-text">{label}</span>
          <span className="label-text-alt">{label2}</span>
        </div>
        <code className="flex-1 block whitespace-pre overflow-none text-left bg-base-200 p-2 rounded-md">
          {typeof value === "bigint" && formatEther(value)}
          {typeof value === "boolean" && (value ? "Yes" : "No")}
        </code>
      </label>
    );
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-xl font-bold">Lottery Details</h2>

      <div className="flex flex-wrap justify-center">
        {renderLabelAndValue<bigint>("Purchase Ratio", "ETH", purchaseRatio)}
        {renderLabelAndValue<bigint>("Bet Price", "ETH", betPrice)}
        {renderLabelAndValue<bigint>("Bet Fee", "ETH", betFee)}
        {renderLabelAndValue<bigint>("Prize Pool", "ETH", prizePool)}
        {renderLabelAndValue<boolean>("Bets Open", "", betsOpen)}
        {renderLabelAndValue<bigint>("Bets Closing Time", "", betsClosingTime)}
      </div>
    </div>
  );
};
