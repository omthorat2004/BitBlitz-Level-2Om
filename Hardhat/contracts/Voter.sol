// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voter {
    struct VoterInfo {
        string name;
        string mobile;
        string addressInfo; 
        string image;
        bool registered;
    }

    mapping(address => VoterInfo) public voters;

    event VoterRegistered(address indexed voter, string name, string mobile, string addressInfo, string image);
    
    // Register a voter
    function registerVoter(string memory _name, string memory _mobile, string memory _addressInfo, string memory _image) public {
        require(!voters[msg.sender].registered, "Voter already registered");

        voters[msg.sender] = VoterInfo({
            name: _name,
            mobile: _mobile,
            addressInfo: _addressInfo,
            image: _image,
            registered: true
        });

        emit VoterRegistered(msg.sender, _name, _mobile, _addressInfo, _image);
    }

    // Get voter details
    function getVoterDetails(address voterAddress) public view returns (string memory name, string memory mobile, string memory addressInfo, string memory image) {
        VoterInfo storage voter = voters[voterAddress];
        require(voter.registered, "Voter not registered");
        return (voter.name, voter.mobile, voter.addressInfo, voter.image);
    }
}
