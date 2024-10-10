// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "./Promise.sol";

contract CentralPromise {
    
    Promise[] promises;
    address masterVerifier;
    
    function initPromise(uint entryFee, uint numUsers, uint cadence, string name, uint expiry) public payable {
        Promise _promise = new Promise(entryFee, numUsers, cadence, name, expiry, masterVerifier);
        promises.add(_promise);
    }

    function setMasterVerifier() public {
        masterVerifier = msg.sender;
    }

}
