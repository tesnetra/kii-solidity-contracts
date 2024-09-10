// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import ERC20 implementation
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// ERC20 Smart contract
contract InkiiToken is ERC20, Ownable {
    uint constant _decimals = 1 * (1 ** 18);
    uint constant _initial_suply = 100_000_000 * (10 ** 18);
    uint public inkiiConvetionRate = 15_000_000_000; // 1 INKII = 15.000M tkii

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

    // Avoid transactions between users
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public override returns (bool) {
        require(
            recipient == address(this),
            "Transfer between users are not allowed"
        );
        return super.transferFrom(sender, recipient, amount);
    }

    // Mint inkii with Kii into the contract balance
    function mint(uint256 inkiiAmount) public onlyOwner {
        // Calculate how many Kii I need to mint
        uint256 requiredKii = inkiiAmount * inkiiConvetionRate;
        require(
            address(this).balance >= requiredKii,
            "Not enougth kii in contract to mint inkii"
        );

        // Spend the Kii
        payable(address(0)).transfer(requiredKii);

        // Mint tokens
        _mint(address(this), inkiiAmount);
    }

    // Transfer INKII tokens from contract to a recipient
    function transferFromContract(
        address recipient,
        uint256 amount
    ) external onlyOwner {
        require(
            balanceOf(address(this)) >= amount,
            "Not enough tokens in contract"
        );
        _transfer(address(this), recipient, amount);
    }

    // Swap INKII by Kii in a specific wallet
    function withdrawal(uint256 inkiiAmount, address wallet) external {
        require(
            balanceOf(msg.sender) >= inkiiAmount,
            "Insufficient INKII balance"
        );

        // Calculate Kii to send
        uint256 kiiAmount = inkiiAmount * inkiiConvetionRate;
        require(
            address(this).balance >= kiiAmount,
            "Contract has insufficient KII to withdrawal"
        );

        // Receive sender's INKII
        _transfer(msg.sender, address(this), inkiiAmount);

        // Send Kii from the contract to the sender
        payable(wallet).transfer(kiiAmount);
    }

    // Edit the convertion ratio
    function editConvetionRate(uint ratio) public onlyOwner returns (bool) {
        require(ratio > 0, "you must provide a valid convertion ratio");
        inkiiConvetionRate = ratio;
        return true;
    }

    // Allow the contract to Receive Kii from any wallet
    receive() external payable {}
}
