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

contract TripleeetNFT is ReentrancyGuard {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _nftCount;

    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    struct NFT {
        uint256 nftId;
        string nftName;
        string nftDescription;
        address uploader;
    }

    mapping(uint256 => NFT) private idToNft;

    event NftUploaded(
        uint256 nftId,
        string nftName,
        string nftDescription,
        address uploader
    );

    function uploadNft(string memory _nftName, string memory _nftDescription)
        external
        nonReentrant
    {
        require(bytes(_nftDescription).length > 0, "Nft Description not found");
        require(bytes(_nftName).length > 0, "Nft Name not found");
        require(msg.sender != address(0), "Sender Address not found");

        _nftCount.increment();
        uint256 nftCount = _nftCount.current();

        idToNft[nftCount] = NFT(
            nftCount,
            _nftName,
            _nftDescription,
            msg.sender
        );

        emit NftUploaded(nftCount, _nftName, _nftDescription, msg.sender);
    }

    function fetchUserNfts() external view returns (NFT[] memory) {
        uint256 totalNftCount = _nftCount.current();
        uint256 userNftCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalNftCount; i++) {
            if (idToNft[i.add(1)].uploader == msg.sender) {
                userNftCount += 1;
            }
        }

        NFT[] memory nfts = new NFT[](userNftCount);

        for (uint256 i = 0; i < totalNftCount; i++) {
            if (idToNft[i.add(1)].uploader == msg.sender) {
                uint256 currentId = i.add(1);
                NFT storage currentNft = idToNft[currentId];
                nfts[currentIndex] = currentNft;
                currentIndex += 1;
            }
        }
        return nfts;
    }
}
