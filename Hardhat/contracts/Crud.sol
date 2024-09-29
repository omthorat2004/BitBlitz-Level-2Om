//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
contract CRUD{
    address public owner;
    using Counters for Counters.Counter;
    Counters.Counter public _ids;

    struct Data{
        uint256 id;
        string name;
        string email;
    }

    Data[] public array;

    constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner,"Owner required");
        _;
    }

    function create(string memory _name,string memory _email) public onlyOwner{
        _ids.increment();
        Data memory data = Data(_ids.current(),_name,_email);
        array.push(data);
    }

    function update(uint256 _id,string memory _name,string memory _email) public onlyOwner{
        require(_id <= array.length);

        for(uint i = 0;i<array.length;i++){
            if(array[i].id==_id){
                array[i].name = _name;
                array[i].email = _email;
            }
        }

    }

    function get() public view onlyOwner returns (Data[] memory){
        return array;
    }
    
    function deleteData(uint256 _id) public onlyOwner{
        require(_id <= array.length,"No such element can exist");
        uint indexToDelete;
        for(uint i = 0;i<array.length;i++){
            indexToDelete = i;
         }

         for(uint j = indexToDelete;j < array.length - 1;j++){
            array[j] = array[j+1];
         }
         array.pop();
    }


}