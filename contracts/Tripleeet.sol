// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "hardhat/console.sol";

library SafeMath {
    function add(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require((z = x + y) >= x, "ds-math-add-overflow");
    }

    function sub(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require((z = x - y) <= x, "ds-math-sub-underflow");
    }

    function mul(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(y == 0 || (z = x * y) / y == x, "ds-math-mul-overflow");
    }
}

contract Tripleeet is ReentrancyGuard {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _postCount;
    Counters.Counter private _lockCount;

    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    struct Post {
        uint256 postId;
        string postHash;
        uint256 postSize;
        string postType;
        string postName;
        string postDescription;
        uint256 uploadTime;
        address uploader;
    }

    struct Lock {
        uint256 id;
        address userLockAddress;
        address user;
    }

    mapping(address => string) private userProfileHash;
    mapping(uint256 => Post) private idToPost;
    mapping(uint256 => Lock) private idToLockAddress;

    event PostUploaded(
        uint256 postId,
        string postHash,
        uint256 postSize,
        string postType,
        string postName,
        string postDescription,
        uint256 uploadTime,
        address uploader
    );

    event LockAddressUploaded(
        uint256 id,
        address userLockAddress,
        address user
    );

    function uploadPost(
        string memory _postHash,
        uint256 _postSize,
        string memory _postType,
        string memory _postName,
        string memory _postDescription
    ) external nonReentrant {
        require(bytes(_postHash).length > 0, "PostHash not found");
        require(bytes(_postType).length > 0, "PostType not found");
        require(
            bytes(_postDescription).length > 0,
            "Post Description not found"
        );
        require(bytes(_postName).length > 0, "PostName not found");
        require(msg.sender != address(0), "Sender Address not found");
        require(_postSize > 0, "Post not found");

        _postCount.increment();
        uint256 postCount = _postCount.current();

        idToPost[postCount] = Post(
            postCount,
            _postHash,
            _postSize,
            _postType,
            _postName,
            _postDescription,
            block.timestamp,
            msg.sender
        );

        emit PostUploaded(
            postCount,
            _postHash,
            _postSize,
            _postType,
            _postName,
            _postDescription,
            block.timestamp,
            msg.sender
        );
    }

    function fetchUserPosts() external view returns (Post[] memory) {
        uint256 totalPostCount = _postCount.current();
        uint256 userPostCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalPostCount; i++) {
            if (idToPost[i.add(1)].uploader == msg.sender) {
                userPostCount += 1;
            }
        }

        Post[] memory posts = new Post[](userPostCount);

        for (uint256 i = 0; i < totalPostCount; i++) {
            if (idToPost[i.add(1)].uploader == msg.sender) {
                uint256 currentId = i.add(1);
                Post storage currentPost = idToPost[currentId];
                posts[currentIndex] = currentPost;
                currentIndex += 1;
            }
        }
        return posts;
    }

    function uploadUserHash(string memory _userHash) external nonReentrant {
        require(bytes(_userHash).length > 0, "User Hash not found");

        userProfileHash[msg.sender] = _userHash;
    }

    function fetchUserProfileHash() external view returns (string memory) {
        return userProfileHash[msg.sender];
    }

    function uploadLockAddress(address _lockAddress) external nonReentrant {
        require(msg.sender != address(0), "Sender Address not found");
        require(_lockAddress != address(0), "Lock Address not found");

        _lockCount.increment();
        uint256 lockCount = _lockCount.current();

        idToLockAddress[lockCount] = Lock(lockCount, _lockAddress, msg.sender);

        emit LockAddressUploaded(lockCount, _lockAddress, msg.sender);
    }

    function fetchUserLockAddress() external view returns (Lock[] memory) {
        uint256 totalLockCount = _lockCount.current();
        uint256 userLockCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalLockCount; i++) {
            if (idToLockAddress[i.add(1)].user == msg.sender) {
                userLockCount += 1;
            }
        }

        Lock[] memory locks = new Lock[](userLockCount);

        for (uint256 i = 0; i < totalLockCount; i++) {
            if (idToLockAddress[i.add(1)].user == msg.sender) {
                uint256 currentId = i.add(1);
                Lock storage currentLock = idToLockAddress[currentId];
                locks[currentIndex] = currentLock;
                currentIndex += 1;
            }
        }
        return locks;
    }
}
