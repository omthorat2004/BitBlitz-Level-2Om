//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.0;



contract Contract {
    address public owner;
    uint256 public count;
    constructor(){
        owner = msg.sender;
    }

    function counter() public  returns (uint256){
        count++;
        return count;
    }
}

