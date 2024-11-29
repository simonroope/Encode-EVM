import { expect } from "chai";
import { ethers } from "hardhat";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { LotteryToken } from "@typechain-types";

const CONTRACT_NAME = "LotteryToken";

describe(CONTRACT_NAME, function () {
  // We define a fixture to reuse the same setup in every test.
  let contract: LotteryToken;
  let deployer: HardhatEthersSigner;
  before(async () => {
    const [owner] = await ethers.getSigners();
    deployer = owner!;
    const contractFactory = await ethers.getContractFactory(CONTRACT_NAME, owner!);
    contract = (await contractFactory.deploy("Lottery Token", "LTK")) as LotteryToken;
    await contract.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should have the correct name", async function () {
      expect(await contract.name()).to.equal("Lottery Token");
    });
    it("Should have the correct symbol", async function () {
      expect(await contract.symbol()).to.equal("LTK");
    });
    it("Deployer should have the minter role", async function () {
      const minterRole = await contract.MINTER_ROLE();
      expect(await contract.hasRole(minterRole, deployer)).to.be.true;
    });
  });
});
