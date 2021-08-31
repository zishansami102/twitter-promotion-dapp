// SPDX-License-Identifier: MIT
pragma solidity ^0.6.7;
import "./APIConsumer.sol";
contract TwitterTask{
    
    APIConsumer apiConsumer;
    
    constructor() public {
        address _add = 0x91b73Ca01420713E6AF11bE82724b3D3BFD0A50a;
        apiConsumer = APIConsumer(_add);
    }
    
    struct taskStruct{
        uint id;
        address owner;
        string title;
        string mustHavePhrase;
        uint totalReward;
        uint unclaimedReward;
        uint rewardPerUnit;
        bool completed;
    }
    
    uint public taskCount;
    mapping(uint => taskStruct) public Task;
   
    function createTask(string memory _title, string memory _mustHavePhrase, uint _rewardPerUnit) payable public {
        
        taskCount++;
        Task[taskCount] = taskStruct(taskCount, msg.sender, _title, _mustHavePhrase, msg.value, msg.value, _rewardPerUnit, false);
    }
    
    struct tweetAdmin{
        address admin;
        bool exists;
    }
    
    mapping(string => tweetAdmin) public tweetClient;
 
    function applyTask(string memory _tweetId, uint _taskId) public{
        require(!tweetClient[_tweetId].exists, "Tweet already registered");
        require(verify(_tweetId, _taskId), "You are not eligible");
 
        tweetClient[_tweetId].admin = msg.sender;
        tweetClient[_tweetId].exists = true;
    }
    
   function verify(string memory _tweetId, uint _taskId) private view returns(bool){
       string memory tweet = apiConsumer.getTweet(_tweetId);
       
       return stringContains(Task[_taskId].mustHavePhrase, tweet);
    }
    
    mapping(string => uint) public claimedReward;
    
    function claimReward(string memory _tweetId, uint _taskId) public {
        // require(tweetClient[_tweetId].exists, "Tweet not verified");
        // require(Task[_taskId].unclaimedReward > Task[_taskId].rewardPerUnit,"No rewards left. Task is completed.");
        
        uint reward;
        
        reward = Task[_taskId].rewardPerUnit * getNoOfUnits(_tweetId) - claimedReward[_tweetId];
        if(reward > Task[_taskId].unclaimedReward) {
            reward = Task[_taskId].unclaimedReward;
        }
        
        payable(tweetClient[_tweetId].admin).transfer(reward);
        claimedReward[_tweetId] += reward;
        Task[_taskId].unclaimedReward -= reward;
        
        if (Task[_taskId].unclaimedReward == 0) {
            Task[_taskId].completed = true;
        }
    }
    
    function getNoOfUnits(string memory _tweetId) private view returns(uint){
        return apiConsumer.getLikes(_tweetId);
    }
    
    function stringContains(string memory what, string memory where) private pure returns(bool) {
        bytes memory whatBytes = bytes (what);
        bytes memory whereBytes = bytes (where);
    
        bool found = false;
        for (uint i = 0; i < whereBytes.length - whatBytes.length; i++) {
            bool flag = true;
            for (uint j = 0; j < whatBytes.length; j++)
                if (whereBytes [i + j] != whatBytes [j]) {
                    flag = false;
                    break;
                }
            if (flag) {
                found = true;
                break;
            }
        }
        return found;
    }
}