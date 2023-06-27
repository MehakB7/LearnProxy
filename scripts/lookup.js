const hre = require("hardhat");
const address = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

async function lookup() {
  const value = await hre.ethers.provider.getStorage(address, 0);
  console.log("value is", parseInt(value, 16));

  //   Reading the  data from the storage  valure returned is hexadecimal
}

lookup();
