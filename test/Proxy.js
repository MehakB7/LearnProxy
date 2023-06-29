const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { assert } = require("ethers");
const { ethers } = require("hardhat");

async function lookup(address, slot) {
  let ans = parseInt(await hre.ethers.provider.getStorage(address, slot));
  return ans;
}

describe("Lock", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const Proxy = await ethers.getContractFactory("Proxy");
    const proxy = await Proxy.deploy();

    const Logic1 = await ethers.getContractFactory("Logic1");
    const logic1 = await Logic1.deploy();

    const Logic2 = await ethers.getContractFactory("Logic2");
    const logic2 = await Logic2.deploy();

    const proxyAsLogic1 = await ethers.getContractAt("Logic1", proxy.target);
    const proxyAsLogic2 = await ethers.getContractAt("Logic2", proxy.target);

    return {
      proxy,
      logic1,
      logic2,
      owner,
      otherAccount,
      proxyAsLogic1,
      proxyAsLogic2,
    };
  }

  describe("Deployment", function () {
    it("initial varaibles checking", async function () {
      const { proxy, logic1, logic2 } = await loadFixture(deployFixture);

      await proxy.changeImplementation(logic1.target);

      let logicX = await logic1.x();
      let logicx2 = await logic2.x();

      await expect(logicX).to.be.eq(0);
      await expect(logicx2).to.be.eq(0);
    });
    it("proxy should call method of logic1 contract", async function () {
      const { proxy, proxyAsLogic1, logic1 } = await loadFixture(deployFixture);

      await proxy.changeImplementation(logic1.target);
      await proxyAsLogic1.changeX(25);
      const ans = await logic1.x();
      await expect(ans).to.be.eq(0);
    });
    it("proxy should call method of logic2 contract", async function () {
      const { proxy, proxyAsLogic2, logic2 } = await loadFixture(deployFixture);

      await proxy.changeImplementation(logic2.target);
      await proxyAsLogic2.changeX(25);
      await proxyAsLogic2.tripleX();
      const ans = await logic2.x();
      await expect(ans).to.be.eq(0);
    });
    it("proxy should call method of logic2 contract and update value in proxy ", async function () {
      const { proxy, proxyAsLogic2, logic2 } = await loadFixture(deployFixture);

      await proxy.changeImplementation(logic2.target);
      await proxyAsLogic2.changeX(25);
      await proxyAsLogic2.tripleX();
      const ans = await lookup(proxy.target, "0x0");

      await expect(ans).to.be.eq(75);
    });
  });
});
