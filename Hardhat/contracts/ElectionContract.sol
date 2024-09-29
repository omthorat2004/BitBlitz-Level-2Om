// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ElectionContract {
    struct Candidate {
        string name;
        uint voteCount;
    }

    struct Election {
        string title;
        uint startDate;
        uint endDate;
        bool isActive;
        mapping(uint => Candidate) candidates;
        uint candidateCount;
        mapping(address => bool) hasVoted;
        uint totalVotes;
    }

    address public admin;
    mapping(uint => Election) public elections;
    uint public electionCount;

    event ElectionCreated(uint indexed electionId, string title, uint startDate, uint endDate);
    event CandidateAdded(uint indexed electionId, uint indexed candidateId, string name);
    event Voted(uint indexed electionId, uint indexed candidateId, address indexed voter);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier electionActive(uint _electionId) {
        require(elections[_electionId].isActive, "Election is not active");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function createElection(string memory _title, uint _startDate, uint _endDate) public onlyAdmin {
        require(_startDate < _endDate, "Start date must be before end date");
        electionCount++;
        Election storage newElection = elections[electionCount];
        newElection.title = _title;
        newElection.startDate = _startDate;
        newElection.endDate = _endDate;
        newElection.isActive = true;

        emit ElectionCreated(electionCount, _title, _startDate, _endDate);
    }

    function addCandidate(uint _electionId, string memory _name) public onlyAdmin electionActive(_electionId) {
        Election storage election = elections[_electionId];
        election.candidateCount++;
        election.candidates[election.candidateCount] = Candidate(_name, 0);

        emit CandidateAdded(_electionId, election.candidateCount, _name);
    }

    function vote(uint _electionId, uint _candidateId) public electionActive(_electionId) {
        Election storage election = elections[_electionId];
        require(block.timestamp >= election.startDate, "Voting has not started yet");
        require(block.timestamp <= election.endDate, "Voting has ended");
        require(!election.hasVoted[msg.sender], "You have already voted");
        
        election.hasVoted[msg.sender] = true;
        election.candidates[_candidateId].voteCount++;
        election.totalVotes++;

        emit Voted(_electionId, _candidateId, msg.sender);
    }

    function getElectionResults(uint _electionId) public view returns (string memory title, uint totalVotes) {
        Election storage election = elections[_electionId];
        title = election.title;
        totalVotes = election.totalVotes;
    }

    function closeElection(uint _electionId) public onlyAdmin electionActive(_electionId) {
        elections[_electionId].isActive = false;
    }

    function isElectionActive(uint _electionId) public view returns (bool) {
        return elections[_electionId].isActive;
    }

    function isAdmin(address account) public view returns (bool) {
    return admin==account?true:false;
}
}