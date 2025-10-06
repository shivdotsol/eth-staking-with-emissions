// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {RewardToken} from "../src/RewardToken.sol";
import {StakingContract} from "../src/StakingContract.sol";

contract StakingContractScript is Script {
    RewardToken public rewardToken;
    StakingContract public stakingContract;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        rewardToken = new RewardToken();
        stakingContract = new StakingContract(address(rewardToken));

        rewardToken.transferOwnership(address(stakingContract));

        vm.stopBroadcast();
    }
}
