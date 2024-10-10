// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "./Promise.sol";

contract CentralPromise {
    
    Promise[] public promises;
    address public masterVerifier;
    
    function initPromise(uint entryFee, uint numUsers, uint cadence, string memory name, uint expiry) public payable {
        Promise _promise = new Promise(entryFee, numUsers, cadence, name, expiry, masterVerifier);
        promises.push(_promise);
    }

    function setMasterVerifier() public {
        masterVerifier = msg.sender;
    }

}
