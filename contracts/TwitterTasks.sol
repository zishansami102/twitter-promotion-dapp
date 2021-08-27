// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract TwitterTasks {
    uint taskCount;
    
    
    
    enum tweetMetrics {
        Likes,
        Comments,
        Retweets
    }
    
    enum promotionCateg {
        Business,
        Finance,
        Technology,
        Fashion,
        Fitness,
        Food,
        Other
    }
    
    struct Task {
    uint id;
    string title;
    string mustHavePhrases;
    uint totalRewardOffered;
    uint unclaimedReward;
    tweetMetrics metric;
    uint metricStepValue;
    uint stepRewardOffered;
    promotionCateg category;
    bool completed;
  }
  
  mapping(uint => Task) public tasks;
  mapping(string => uint) public claimedRewards;
  
  function createTask(string memory _title, string memory _mustHavePhrases, uint _rewardOffered, tweetMetrics _metric, uint _metricStepValue, uint _stepRewardOffered, promotionCateg _categ) public {
      // add check on parameters
      
      taskCount ++;
      tasks[taskCount] = Task(taskCount, _title, _mustHavePhrases, _rewardOffered, _rewardOffered, _metric, _metricStepValue, _stepRewardOffered, _categ, false);
  }
  
  function getTask(uint _id) public view returns (Task memory) {
      // add check on parameters
      
      return tasks[_id];
  }
  
  function getAllTasks() public view returns (Task[] memory) {
      Task[] memory allTasks = new Task[](taskCount);
      for (uint i = 0; i < taskCount; i++) {
        allTasks[i] = tasks[i+1];
      }
      return allTasks;
  }
  
  function checkRewardEligibility(uint _taskId, string memory tweetId) public view returns (uint) {
      // add check on parameters
      
      uint reward = 0;
      if (tasks[_taskId].completed || tasks[_taskId].unclaimedReward < tasks[_taskId].stepRewardOffered) {
          return reward;
      }
      // manully setting gained metric steps (will later update to counting the steps when chainLink is integrated)
      uint metricAchieved = tasks[_taskId].metricStepValue + 1;
      
      reward = ( metricAchieved / tasks[_taskId].metricStepValue ) * tasks[_taskId].stepRewardOffered - claimedRewards[tweetId];
    //   claimedRewards[tweetId] = claimedRewards[tweetId] + reward;
      return reward;
  }
  
//   function claimReward(uint _taskId, )
  
  
}