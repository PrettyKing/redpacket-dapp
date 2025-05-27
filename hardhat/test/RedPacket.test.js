const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RedPacket", function () {
  let redPacket;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    
    const RedPacket = await ethers.getContractFactory("RedPacket");
    redPacket = await RedPacket.deploy();
    await redPacket.waitForDeployment();
  });

  describe("创建红包", function () {
    it("应该成功创建红包", async function () {
      const amount = ethers.parseEther("1.0");
      const count = 5;
      const isEqual = true;

      await expect(
        redPacket.createRedPacket(count, isEqual, { value: amount })
      )
        .to.emit(redPacket, "RedPacketCreated")
        .withArgs(owner.address, amount, count, isEqual);

      const info = await redPacket.getRedPacketInfo();
      expect(info[0]).to.equal(owner.address); // creator
      expect(info[1]).to.equal(amount); // remaining
      expect(info[2]).to.equal(count); // remainingCount
      expect(info[3]).to.equal(isEqual); // equalDistribution
      expect(info[4]).to.equal(true); // initialized
    });

    it("应该拒绝重复初始化", async function () {
      const amount = ethers.parseEther("1.0");
      const count = 5;
      const isEqual = true;

      await redPacket.createRedPacket(count, isEqual, { value: amount });
      
      await expect(
        redPacket.createRedPacket(count, isEqual, { value: amount })
      ).to.be.revertedWith("RedPacket already initialized");
    });

    it("应该拒绝零金额", async function () {
      await expect(
        redPacket.createRedPacket(5, true, { value: 0 })
      ).to.be.revertedWith("amount must > 0");
    });
  });

  describe("抢红包", function () {
    beforeEach(async function () {
      const amount = ethers.parseEther("1.0");
      await redPacket.createRedPacket(3, true, { value: amount });
    });

    it("应该成功抢到红包", async function () {
      const initialBalance = await ethers.provider.getBalance(addr1.address);
      
      const tx = await redPacket.connect(addr1).grabRedPacket();
      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed * receipt.gasPrice;
      
      const finalBalance = await ethers.provider.getBalance(addr1.address);
      const expectedAmount = ethers.parseEther("1.0") / 3n;
      
      // 检查余额增加（减去gas费用）
      expect(finalBalance + gasUsed - initialBalance).to.equal(expectedAmount);
      
      // 检查用户已标记为抢过
      expect(await redPacket.hasGrabbed(addr1.address)).to.be.true;
    });

    it("应该拒绝重复抢红包", async function () {
      await redPacket.connect(addr1).grabRedPacket();
      
      await expect(
        redPacket.connect(addr1).grabRedPacket()
      ).to.be.revertedWith("you have grabed");
    });

    it("应该在红包抢完后拒绝继续抢", async function () {
      // 抢完所有红包
      await redPacket.connect(addr1).grabRedPacket();
      await redPacket.connect(addr2).grabRedPacket();
      await redPacket.connect(addrs[0]).grabRedPacket();
      
      await expect(
        redPacket.connect(addrs[1]).grabRedPacket()
      ).to.be.revertedWith("count must > 0");
    });
  });

  describe("查询功能", function () {
    it("应该正确返回合约余额", async function () {
      const amount = ethers.parseEther("1.0");
      await redPacket.createRedPacket(3, true, { value: amount });
      
      expect(await redPacket.getBalance()).to.equal(amount);
    });

    it("应该正确返回红包信息", async function () {
      const amount = ethers.parseEther("1.0");
      const count = 3;
      const isEqual = false;
      
      await redPacket.createRedPacket(count, isEqual, { value: amount });
      
      const info = await redPacket.getRedPacketInfo();
      expect(info[0]).to.equal(owner.address);
      expect(info[1]).to.equal(amount);
      expect(info[2]).to.equal(count);
      expect(info[3]).to.equal(isEqual);
      expect(info[4]).to.equal(true);
    });
  });
});