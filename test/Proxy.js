const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { assert } = require("ethers");

describe("Lock", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const Proxy = await ethers.getContractFactory("Proxy");
    const proxy = await Proxy.deploy();

    const Logic1 = await ethers.getContractFactory("Logic1");
    const logic1 = await Logic1.deploy();

    const Logic2 = await ethers.getContractFactory("Logic2");
    const logic2 = await Logic2.deploy();

    return { proxy, logic1, logic2, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("inital varaibles checking", async function () {
      const { proxy, logic1, logic2 } = await loadFixture(deployFixture);

      await proxy.changeImplementation(logic1.target);
      let imp = await proxy.implmentation();
      let logicX = await logic1.x();
      let logicx2 = await logic2.x();

      await expect(imp).to.be.eq(logic1.target);
      await expect(logicX).to.be.eq(0);
      await expect(logicx2).to.be.eq(0);
    });
  });
});
