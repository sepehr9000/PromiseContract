    // SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Promise {

    uint public entryFee;
    uint public numUsers;
    uint public cadence;
    string public name;
    uint public expiry;
    address[] public users;
    address[] public losingUsers;

    struct Vote {
        mapping(address => bool) vote;
        uint numVotes;
        address participant;
    }

    Vote[] public votes;

    modifier canVote(uint _round){
        require(votes[_round].numVotes < users.length, "All Users Have Voted");
        require(votes[_round].vote[msg.sender] == false, "User Has Already Voted");
        _;
    }

    modifier onlyUsers() {
        bool isUser = false;
        for (uint i = 0; i < users.length; i++) {
            if (users[i] == msg.sender) {
                isUser = true;
                break;
            }
        }
        require(isUser, "Only users can call this function");
        _;
    }

    modifier onlyMasterVerifier() {
        require(msg.sender == verifier, "Only Master Verifier Can Call This Function");
        _;
    }    address public verifier;
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

    modifier isVerifier(){
        require(msg.sender == verifier, "Caller Must be Authorized Verifier");
        _;
    }

    modifier isActive() {
        require(block.timestamp <= expiry, "Promise Has Already Expired");
        require(users.length == numUsers, "All Users Have Not Joined Yet");
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


    function initiateVote() public onlyMasterVerifier isActive {
        require(block.timestamp >= lastVoteTime + cadence, "There is already a voting event ongoing");

        lastVoteTime = block.timestamp;
        // Reset votes
        for (uint i = 0; i < users.length; i++) {
            delete votes[i];
        }
    }
    
    function userSatisfiedPromise(address _user, bool _didSatisfy) public isOpen isVerifier {
        
    }
}