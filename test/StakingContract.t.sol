// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
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
        vm.prank(address(stakingContract)); // because stakingContract owns rewardToken
        rewardToken.mintTo(
            address(0x66C867E8cB8F1194D8DBF29A3b1BA788e8689d94),
            1000
        );
    }

    function test_RevertMint() public {
        // calling mintTo() from a non-owner address
        vm.expectRevert();
        rewardToken.mintTo(
            address(0x66C867E8cB8F1194D8DBF29A3b1BA788e8689d94),
            1000
        );
    }

    function testStakingAndUnstaking() public {
        address user = 0x66C867E8cB8F1194D8DBF29A3b1BA788e8689d94;
        vm.startPrank(user);
        vm.deal(user, 10 ether);
        stakingContract.stake{value: 1 ether}();
        assert(stakingContract.getStakedValue() == 1 ether);
        // now unstake
        stakingContract.unStake(0.5 ether);
        assert(stakingContract.getStakedValue() == 0.5 ether);
        assert(user.balance == 9.5 ether);
    }

    function testRewards() public {
        address user = 0x66C867E8cB8F1194D8DBF29A3b1BA788e8689d94;
        vm.startPrank(user);
        vm.deal(user, 10 ether);
        // testing reward calculation
        stakingContract.stake{value: 5 ether}();
        vm.warp(block.timestamp + 30 days);
        uint256 expectedReward = (5 ether * 30 days) / 10000;
        assert(stakingContract.getAvailableReward() == expectedReward);

        // testing reward disbursal
        stakingContract.claimReward();
        assert(rewardToken.balanceOf(user) == expectedReward);

        // rewards reset
        assert(stakingContract.getAvailableReward() == 0);
    }
}
