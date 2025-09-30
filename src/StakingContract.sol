// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract StakingContract is Ownable {
    address rewardTokenContract;
    mapping(address => uint256) stakeMapping;
    mapping(address => uint256) lastStakedTime;
    mapping(address => uint256) rewards;
    uint16 constant REWARD_MULTIPLIER = 1000;

    constructor(address _rewardTokenContract) Ownable(msg.sender) {
        rewardTokenContract = _rewardTokenContract;
    }

    function updateReward(address _address) private {
        uint256 timeLapsed = block.timestamp - lastStakedTime[_address];
        uint256 newReward = (timeLapsed * stakeMapping[_address]) /
            REWARD_MULTIPLIER;
        rewards[_address] += newReward;
    }

    function stake() public payable {
        if (lastStakedTime[msg.sender] != 0) {
            updateReward(msg.sender);
        }
        stakeMapping[msg.sender] += msg.value;
        lastStakedTime[msg.sender] = block.timestamp;
    }

    function unStake(uint256 _amount) public {
        require(_amount <= stakeMapping[msg.sender]);
        updateReward(msg.sender); // settle previous rewards
        payable(msg.sender).transfer(_amount);
        stakeMapping[msg.sender] -= _amount;
    }

    function getAvailableReward() public view returns (uint256) {
        uint256 newReward = ((block.timestamp - lastStakedTime[msg.sender]) *
            stakeMapping[msg.sender]) / REWARD_MULTIPLIER;
        uint256 currentReward = rewards[msg.sender] + newReward;
        return currentReward;
    }

    function claimReward() public {
        updateReward(msg.sender);
        // CCI ERC20 mintTo()
        rewards[msg.sender] = 0;
        lastStakedTime[msg.sender] = block.timestamp;
    }
}
