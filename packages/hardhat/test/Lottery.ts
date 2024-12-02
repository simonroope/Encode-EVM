import { expect } from "chai";
import { ethers } from "hardhat";
import { parseEther } from "ethers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { Lottery } from "@typechain-types";

describe('Lottery', function () {
  // We define a fixture to reuse the same setup in every test.
  let lotteryContract: Lottery;
  let deployer: HardhatEthersSigner;

  const TOKEN_RATIO = 1n;
  const BET_PRICE = parseEther('1');   // 1 Ether
  const BET_FEE = parseEther('0.2');   // 0.2 Ether

  before(async () => {
    const [owner] = await ethers.getSigners();
    deployer = owner!;
    const contractFactory = await ethers.getContractFactory('Lottery', owner!);
    lotteryContract = (await contractFactory.deploy('LotteryToken','LTK',TOKEN_RATIO,BET_PRICE,BET_FEE)) as Lottery;
    await lotteryContract.waitForDeployment();
  });


  describe("Deployment", function () {
    it("Should have the correct name", async function () {
      expect(true).to.equal(true);
    });
  });
});

// const BET_PRICE = "1";
// const BET_FEE = "0.2";
// const TOKEN_RATIO = 1n;

// constructor(
//     string memory tokenName,
//     string memory tokenSymbol,
//     uint256 _purchaseRatio,
//     uint256 _betPrice,
//     uint256 _betFee
// )

// const deployment = await deploy("Lottery", {
//     from: deployer!,
//     // Contract constructor arguments
//     args: ["LotteryToken", "LTO", TOKEN_RATIO, parseEther(BET_PRICE), parseEther(BET_FEE)],
//     log: true,
//   });


