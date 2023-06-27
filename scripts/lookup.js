const { keccak256, zeroPadValue, toBeHex } = require("ethers");
const hre = require("hardhat");
const address = "0x0165878A594ca255338adfa4d48449f69242Eb8F";

async function lookup() {
  const value = await hre.ethers.provider.getStorage(address, 0);
  console.log("value is", parseInt(value, 16));

  //   Reading the  data from the storage  value turned is hexadecimal

  /**
   * when we read the values for mapping the slot allocate for each value is
   * keccak256(key + slotBase) ;
   * the slotBase is the starting position of slot for our example it's 2
   *
   * so when we do keccak256(key+slotBase)  => returns an address where our values will be stored
   *
   *
   */

  const zeroPadKey = zeroPadValue(toBeHex(123), 32);
  const slot = zeroPadValue(toBeHex(2), 32).slice(2);
  const key = keccak256(zeroPadKey + slot);
  console.log("key os", key);
  const mapValue = await hre.ethers.provider.getStorage(address, key);
  console.log("value is", parseInt(mapValue, 16));
}

lookup();
