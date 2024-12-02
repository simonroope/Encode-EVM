import { expect } from "chai";
import { ethers } from "hardhat";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { LotteryToken } from "@typechain-types";

describe('LotteryToken', function () {
  // We define a fixture to reuse the same setup in every test.
  let tokenContract: LotteryToken;

  let deployer: HardhatEthersSigner;
  before(async () => {
    const [owner] = await ethers.getSigners();
    deployer = owner!;
    const contractFactory = await ethers.getContractFactory('LotteryToken', owner!);
    tokenContract = (await contractFactory.deploy("Lottery Token", "LTK")) as LotteryToken;
    await tokenContract.waitForDeployment();
    // console.log("LotteryToken contract deployed to:", tokenContract.target, await tokenContract.getAddress());
  });

  describe("Deployment", function () {
    it("Should have the correct name", async function () {
      expect(await tokenContract.name()).to.equal("Lottery Token");
    });
    it("Should have the correct symbol", async function () {
      expect(await tokenContract.symbol()).to.equal("LTK");
    });
    it("Deployer should have the minter role", async function () {
      const minterRole = await tokenContract.MINTER_ROLE();
      expect(await tokenContract.hasRole(minterRole, deployer)).to.be.true;
    });
  });
});
