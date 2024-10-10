// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Promise {

    uint public entryFee;
    uint public numUsers;
    uint public cadence;
    string public name;
    uint public expiry;
    address[] public users;


    modifier canAddUser(){
        require(users.length < numUsers, "Promise is Not Accepting New Users");
        _;
    }

    constructor(uint _entryFee, uint _numUsers, uint _cadence, string memory _name, uint _expiry){
        entryFee = _entryFee;
        numUsers = _numUsers;
        cadence = _cadence;
        name = _name;
        expiry = _expiry;
    }

    function addUser() public payable canAddUser {


    }
}