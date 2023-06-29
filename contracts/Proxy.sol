// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "./Storage.sol";

contract Proxy {
    // we will keep the storage in the proxy contacts
    uint x;

    function changeImplementation(address _implementation) external {
        StorageSlot.getAddressSlot(keccak256("impl")).value = _implementation;
    }

    fallback() external {
        (bool success, ) = StorageSlot
            .getAddressSlot(keccak256("impl"))
            .value
            .delegatecall(msg.data);
        require(success);
    }
}

contract Logic1 {
    uint public x;

    function changeX(uint _x) external {
        x = _x;
    }
}

contract Logic2 {
    uint public x;

    function changeX(uint _x) external {
        x = _x;
    }

    function tripleX() external {
        x *= 3;
    }
}
