// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {console} from "forge-std/console.sol";
import {StakingContract} from "../src/StakingContract.sol";
import {RewardToken} from "../src/RewardToken.sol";

contract StakingTest is Test {
    StakingContract stakingContract;
    RewardToken rewardToken;

    function setUp() public {
        rewardToken = new RewardToken();
        stakingContract = new StakingContract(address(rewardToken));
        rewardToken.transferOwnership(address(stakingContract));
    }

    function testMint() public {
        vm.prank(address(stakingContract));
        rewardToken.mintTo(
            address(0x66C867E8cB8F1194D8DBF29A3b1BA788e8689d94),
            1000
        );
    }
}
