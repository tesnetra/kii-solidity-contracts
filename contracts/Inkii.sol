// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import ERC20 implementation
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// ERC20 Smart contract
contract InkiiToken is ERC20, Ownable {
    uint constant _decimals = 1 * (1 ** 18);
    uint constant _initial_suply = 1_000_000 * (10 ** 18);
    uint public constant inkiiConvetionRate = 15_000_000_000; // 1 INKII = 15.000M tkii

    constructor(
        address initialOwner
    ) ERC20("inkii", "INKII") Ownable(initialOwner) {
        _mint(address(this), _initial_suply);
    }

    // Overwrite transfer function, just the deployer address can transfer money
    function transfer(
        address recipient,
        uint256 amount
    ) public override onlyOwner returns (bool) {
        return super.transfer(recipient, amount);
    }

    // Allow an account spend tokens in another account's name
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public override onlyOwner returns (bool) {
        return super.transferFrom(sender, recipient, amount);
    }

    // Mint inkii with Kii into the contract balance
    function mint() public payable onlyOwner {
        require(msg.value > 0, "You need to send Kii tokens");

        uint256 inkiiToMint = msg.value / inkiiConvetionRate;
        _mint(address(this), inkiiToMint);
    }

    // Transfer INKII tokens from contract to a recipient
    function transferFromContract(
        address recipient,
        uint256 amount
    ) public onlyOwner {
        require(
            balanceOf(address(this)) >= amount,
            "Not enough tokens in contract"
        );
        _transfer(address(this), recipient, amount);
    }

    // Swap INKII by Kii in a specific wallet
    function withdrawal(uint256 inkiiAmount, address wallet) public {
        require(
            balanceOf(msg.sender) >= inkiiAmount,
            "Insufficient INKII balance"
        );

        require(
            inkiiAmount >= 1_000_000,
            "IKII value must be higher than 1.000.000"
        );

        // Calculate Kii to send
        uint256 kiiAmount = inkiiAmount * inkiiConvetionRate;
        require(
            address(this).balance >= kiiAmount,
            "Contract has insufficient KII"
        );

        // Receive sender's INKII
        _transfer(msg.sender, address(this), inkiiAmount);

        // Send Kii from the contract to the sender
        payable(wallet).transfer(kiiAmount);
    }

    // Allow the contract to Receive Kii from any wallet
    receive() external payable {}
}
