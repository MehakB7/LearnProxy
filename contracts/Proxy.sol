// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Proxy {
    address public implmentation;

    function changeImplementation(address _implementation) external {
        implmentation = _implementation;
    }

    fallback() external {
        (bool success, ) = implmentation.call(msg.data);
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
