// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RewardToken is ERC20, Ownable {
    constructor() ERC20("RewardToken", "RWD") Ownable(msg.sender) {}

    // ownership will be manually transferred to the staking contract after that contract gets deployed

    function mintTo(address _address, uint256 _amount) external onlyOwner {
        _mint(_address, _amount);
    }
}
