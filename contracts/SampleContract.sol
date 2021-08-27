// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract SampleContract {
    event Greet(string message);

    function greet() public {
        emit Greet("Hello World!");
    }
}
