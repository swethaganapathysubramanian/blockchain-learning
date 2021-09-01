pragma solidity ^0.5.0;

contract SocialNetwork {
    string public name;
    uint public postCount = 0;
    mapping(uint => Post) public posts;

    struct Post {
        uint id;
        string content;
        uint tipAmount;
        address author;
    }

    event postCreated(
        uint id,
        string content,
        uint tipAmount,
        address author
    );

    constructor() public {
        name = "Blockchain Test App";

    }
    function createPost(string memory _content) public {
        //Require valid content
        require(bytes(_content).length >0);
        //Increment post count
        postCount ++;
        //Create Post
        posts[postCount] = Post(1, _content,0 , msg.sender);
       // Trigger event
        emit postCreated(postCount, _content, 0, msg.sender);


    }
}