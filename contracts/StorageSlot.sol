// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract StorageSlot {
    uint num1 = 97; //Ox0
    uint num2 = 98; //Ox1
    mapping(int => int) testing; //0x2
    uint8 some = 2;

    constructor() {
        testing[123] = 50;
        testing[3] = 60;
    }
}
