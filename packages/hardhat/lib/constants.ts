import * as dotenv from "dotenv";
dotenv.config();

const alchemyAPIKey = process.env.ALCHEMY_API_KEY || "";
export const constants = Object.freeze({
  account: {
    deployerPrivateKey: process.env.DEPLOYER_PRIVATE_KEY || "",
  },
  contracts: {
    lottery: {
      sepolia: process.env.LOTTERY_SEPOLIA || "",
    },
    lotteryToken: {
      sepolia: process.env.LOTTERY_TOKEN_SEPOLIA || "",
    },
  },
  integrations: {
    alchemy: {
      apiKey: alchemyAPIKey,
      sepolia: `https://eth-sepolia.g.alchemy.com/v2/${alchemyAPIKey}`,
    },
    etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY || "",
    },
  },
});
