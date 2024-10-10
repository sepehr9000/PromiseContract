// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "./Promise.sol";

contract CentralPromise {
    
    Promise[] promises;

    
    function addPromise(uint entryFee, uint numUsers, uint cadence, string name, uint expiry) public payable {
        Promise _promise = new Promise(entryFee, numUsers, cadence, name, expiry);
        promises.add(_promise);
    }

    function increment() public {
        number++;
    }
}
