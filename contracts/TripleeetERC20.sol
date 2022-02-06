// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract TripleeetERC20 is ERC20 {
    address public admin;

    constructor(
        string memory name,
        string memory symbol,
        uint256 amount
    ) ERC20(name, symbol) {
        _mint(msg.sender, amount * 10**18);
        admin = msg.sender;
    }

    function mint(address _to, uint256 _amount) external {
        require(msg.sender == admin, "only admin");
        _mint(_to, _amount);
    }

    function burn(uint256 _amount) external {
        _burn(msg.sender, _amount);
    }
}
