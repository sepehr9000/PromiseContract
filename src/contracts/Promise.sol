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

    struct Vote {
        mapping(address => int) vote; // -1: not voted, 0: voted yes, 1: voted no
        uint numVotes;
    }

    mapping(address => Vote) public votes;

    modifier canVote(address _candidate){
        require(votes[_candidate].numVotes == numUsers, "All Users Have Voted");
        require(votes[_candidate].vote[msg.sender] != -1, "User Has Already Voted");
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
        for (uint i = 0; i < numUsers; i++) {
            for (uint j = 0; j < numUsers; j++) {
                votes[users[i]].vote[users[j]] = -1;
            }
            votes[users[i]].numVotes = 0;
        }
    }

    function castVote(address user, bool vote) public onlyUsers isActive canVote(user) {
        votes[user].vote[msg.sender] = vote ? int(0) : int(1);
        votes[user].numVotes++;
    }

    function finalizeVote() public onlyMasterVerifier isActive {
        for (uint i = 0; i < users.length; i++) {
            int votesAgainst = 0;
            for (uint j = 0; j < users.length; j++) {
                votesAgainst += votes[users[i]].vote[users[j]] == -1 ? int(0) : votes[users[i]].vote[users[j]];
            }
            if (votesAgainst > int(votes[users[i]].numVotes) / 2) {
                losingUsers.push(users[i]);
            }
        }
    }

    function userIsEligible(address _user) public view returns(bool) {
        for (uint i = 0; i < users.length; i++) {
            if (users[i] == _user) {
                for (uint j = 0; j < losingUsers.length; j++) {
                    if (losingUsers[j] == _user) {
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    }
    
    function payoutCompletedPromise() public isOpen isVerifier {
        require(block.timestamp >= expiry, "Promise has not yet completed");
        for (uint i = 0; i < users.length; i++) {
            if (userIsEligible(users[i])){
                address payable to = payable(users[i]);
                to.transfer(entryFee);
            }
        }
    }
}