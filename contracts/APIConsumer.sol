// SPDX-License-Identifier: MIT
pragma solidity ^0.6.7;

import "../contracts/v0.6/ChainlinkClient.sol";

/**
 * THIS IS AN EXAMPLE CONTRACT WHICH USES HARDCODED VALUES FOR CLARITY.
 * PLEASE DO NOT USE THIS CODE IN PRODUCTION.
 */
contract APIConsumer is ChainlinkClient {
    using Chainlink for Chainlink.Request;
  
    // uint256 public likes;
    // string public tweetText;
    mapping(string => uint256) likes;
    mapping(string => string) tweets;
    string tweet_id;
    
    address private oracle;
    bytes32 private jobIdForUint256;
    bytes32 private jobIdForBytes32;
    uint256 private fee;
    
    /**
     * Network: Kovan
     * Oracle: 0xc57B33452b4F7BB189bB5AfaE9cc4aBa1f7a4FD8 (Chainlink Devrel   
     * Node)
     * Job ID: d5270d1c311941d0b08bead21fea7747
     * Fee: 0.1 LINK
     */
    constructor() public {
        setPublicChainlinkToken();
        oracle = 0x56dd6586DB0D08c6Ce7B2f2805af28616E082455;
        jobIdForUint256 = "b6602d14e4734c49a5e1ce19d45a4632";
        jobIdForBytes32 = "c128fbb0175442c8ba828040fdd1a25e";
        fee = 0.1 * 10 ** 18; // (Varies by network and job)
    }
    
    function updateTweetData(string memory _tweetId) public {
        tweet_id = _tweetId;
        updateLikes(_tweetId);
        updateTweet(_tweetId);
    }
    
    /**
     * Create a Chainlink request to retrieve API response, find the target
     * data, then multiply by 1000000000000000000 (to remove decimal places from data).
     */
    function updateLikes(string memory _tweetId) private returns (bytes32 requestId) 
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobIdForUint256, address(this), this.fulfill1.selector);
        
        string memory url = string(abi.encodePacked("http://3b07-2401-4900-385b-8b7e-bc76-ed28-f5fb-ecc5.ngrok.io/likes?id=", _tweetId));
        request.add("get", url);

        request.add("path", "no_like");
        
        // Multiply the result by 1000000000000000000 to remove decimals
        
        int timesAmount = 1;
        request.addInt("times", timesAmount);
        
        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }
    
    /**
     * Create a Chainlink request to retrieve API response, find the target
     * data, then multiply by 1000000000000000000 (to remove decimal places from data).
     */
    function updateTweet(string memory _tweetId) private returns (bytes32 requestId) 
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobIdForBytes32, address(this), this.fulfill2.selector);
        
        string memory url = string(abi.encodePacked("http://3b07-2401-4900-385b-8b7e-bc76-ed28-f5fb-ecc5.ngrok.io/tweet?id=", _tweetId));
        request.add("get", url);

        request.add("path", "tweet_text");
        
        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }
    
    /**
     * Receive the response in the form of uint256
     */ 
    function fulfill1(bytes32 _requestId, uint256 _likes) public recordChainlinkFulfillment(_requestId)
    {
        likes[tweet_id] = _likes;
    }
    
    /**
     * Receive the response in the form of uint256
     */ 
    function fulfill2(bytes32 _requestId, bytes32 _tweet) public recordChainlinkFulfillment(_requestId)
    {
        tweets[tweet_id] = bytes32ToString(_tweet);
    }
    
    function bytes32ToString(bytes32 _bytes32) private pure returns (string memory) {
        uint8 i = 0;
        while(i < 32 && _bytes32[i] != 0) {
            i++;
        }
        bytes memory bytesArray = new bytes(i);
        for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
            bytesArray[i] = _bytes32[i];
        }
        return string(bytesArray);
    }
    
    function getTweet(string memory _tweetId) public view returns (string memory) {
        return tweets[_tweetId];
    }
    
    function getLikes(string memory _tweetId) public view returns (uint256) {
        return likes[_tweetId];
    }

    // function withdrawLink() external {} - Implement a withdraw function to avoid locking your LINK in the contract
}