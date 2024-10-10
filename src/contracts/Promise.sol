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
    address public verifier;
    mapping(address => uint) balances;
    mapping(address => bool) eligibleUsers;
    uint public lastVoteTime;

    mapping(address => address[]) public votedForMap; // user => users the user voted for
    mapping(address => int) public voteScoreMap;

    modifier canVote(address _candidate){
        require(_candidate != msg.sender, "User Cannot Vote for Themselves");
        for (uint i = 0; i < losingUsers.length; i++){
            require(losingUsers[i] != _candidate, "Candidate is Not Eligible to be Voted For");
        }
        for (uint i = 0; i < votedForMap[msg.sender].length; i++){
            require(votedForMap[msg.sender][i] != _candidate, "User Has Already Voted for This Candidate");
        }
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
    }

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
        expiry = _expiry + block.timestamp;
        verifier = _verifier;
        lastVoteTime = 0;
    }

    function addUser() public payable canAddUser isOpen {
        require(balances[msg.sender] <= entryFee, "User has already Paid");
        require(msg.value == entryFee, "User sent invalid amount");
        for (uint i; i< users.length; i++){
          if (users[i] == msg.sender){
            revert();
          }
        balances[msg.sender] = msg.value;
        users.push(msg.sender);
        eligibleUsers[msg.sender] = true;
     }
    }


    function initiateVote() public onlyMasterVerifier isActive {
        require(block.timestamp >= lastVoteTime + cadence, "There is already a voting event ongoing");

        lastVoteTime = block.timestamp;
        // Reset votes
        for (uint i = 0; i < users.length; i++) {
            votedForMap[users[i]] = new address[](0);
            voteScoreMap[users[i]] = 0;
        }
    }

    function castVote(address user, bool vote) public onlyUsers isActive canVote(user) {
        votedForMap[msg.sender].push(user);
        voteScoreMap[user] = vote ? int(1) : int(-1);
    }

    function finalizeVote() public onlyMasterVerifier isActive {
        for (uint i = 0; i < users.length; i++) {
            if (voteScoreMap[users[i]] < 0) {
                losingUsers.push(users[i]);
            }
        }
    }
    
    function userSatisfiedPromise(address _user, bool _didSatisfy) public isOpen isVerifier {
        
    }
}