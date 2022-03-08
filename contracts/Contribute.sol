// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract Contribute {
    address owner;

    address[] donatorAddresses; 
    uint[] donatorAmounts;

    // Here is the answer to question why I didnt use struct's
    // It's because I stucked with error storing some data in state or memory
    // So i decided to store donator addresses and amounts separated

    constructor() {
        owner = msg.sender;
    }

    modifier ownerOnly {
        require (
            msg.sender == owner, 'Permission denied.'
        );
        _;
    }

    function withdraw(address payable _to, uint _amount) public ownerOnly {
        require(
         address(this).balance >= _amount,
         "Not enough token on balance."
        );
        
        _to.transfer(_amount); 
    }

    function addDonator(address _donator, uint _amount) private {
        bool uniqueDonator = true; // Flag to check if the Donator unique or already contributed
        for (uint i = 0; i < donatorAddresses.length; i++) {
            if (donatorAddresses[i] == _donator) {
                donatorAmounts[i] += _amount;
                uniqueDonator = false;
            }
        }

        if (uniqueDonator) {
            donatorAddresses.push(_donator);
            donatorAmounts.push(_amount);
        }

    }

    function donate(uint _amount) public payable {
        require(
         msg.value >= _amount,
         "Not enough token provided."
        );

        addDonator(msg.sender, _amount); // Adding to donatorList

    }



    function getDonators() public view returns(address[] memory) {
        return donatorAddresses;
    }

    function getAmount(address _donator) public view returns(uint) {
        for (uint i = 0; i < donatorAddresses.length; i++) {
            if (donatorAddresses[i] == _donator) {
                return donatorAmounts[i];
            }
        }
        return 0;
    }

}