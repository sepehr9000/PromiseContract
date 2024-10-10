    // SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Promise {

    uint public entryFee;
    uint public numUsers;
    uint public cadence;
    string public name;
    uint public expiry;
    address[] public users;
    address public verifier;
    mapping(address => uint) balances;
    mapping(address => bool) eligibleUsers;

    modifier canAddUser(){
        require(users.length < numUsers, "Promise is Not Accepting New Users");
        _;
    }

    modifier isOpen(){
        require(block.timestamp <= expiry, "Promise Has Already Expired");
        _;
    }

    constructor(uint _entryFee, uint _numUsers, uint _cadence, string memory _name, uint _expiry, address _verifier){
        entryFee = _entryFee;
        numUsers = _numUsers;
        cadence = _cadence;
        name = _name;
        expiry = _expiry;
        verifier = _verifier;
    }

    function addUser() public payable canAddUser isOpen {
        require(balances[msg.sender] <= entryFee, "User has already Paid");
        require(msg.value == entryFee, "User sent invalid amount");
        balances[msg.sender] = msg.value;
        users.push(msg.sender);
        eligibleUsers[msg.sender] = true;
    }

    function verifyUser() public 
}