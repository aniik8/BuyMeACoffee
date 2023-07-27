//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.9;

contract BuyCoffee{
    // owner of smart contract
    address payable owner;
    // assigning owner to the deployer
    constructor(){
        owner = payable (msg.sender);
    }
    // Struct about the person who'll let buy a coffee
    struct Person{
        address _from;
        uint timeStamp;
        string name;
        string messsage;
    }
    Person[] public person;
    
    //event to show the transaction history from a particular user
    event ShowMessage(address _from, uint timeStamp, string name, string messsage);


    // a function that'll record the transactions 
    function transactions(string memory _name, string memory _message) public payable {
        require(msg.value > 0, "Not a valid amount to send coffee");
        person.push(Person(msg.sender, block.timestamp, _name, _message));
        emit ShowMessage(msg.sender, block.timestamp, _name, _message);
    }

    // function to withdraw the transactions
    function withdraw() public{
        require(msg.sender == owner, "only owner can withdraw the transaction");
        require(owner.send(address(this).balance), "not able to send the transaction");
    }

    // function to  get the message on the output screen
    function getMessage() public view returns(Person[] memory){
        return person;
    }

}