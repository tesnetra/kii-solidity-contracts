// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract AirdropNFT is ERC721URIStorage {
    uint256 private _tokenId;

    mapping(uint256 => uint256) public tokenPrices;

    // Events
    event TokenPurchased(address buyer, uint256 tokenId, uint256 price);

    constructor() ERC721("InkiiCollection", "InkiiNFTs") {}

    // Determine whether the tokenId exist
    function _exists(uint256 tokenId) internal view virtual returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }

    function CreateToken(
        string memory tokenURI,
        uint256 price
    ) public payable returns (uint256) {
        // Increase the unique identifier for each NFT
        uint256 tokenId = ++_tokenId;

        // Mint NFT
        _mint(msg.sender, tokenId);

        // Set the NFT to a graphic element (Image, pdf, video, etc.)
        _setTokenURI(tokenId, tokenURI);

        // Set price to the NFT
        SetTokenPrice(tokenId, price);

        return tokenId;
    }

    function SetTokenPrice(uint256 tokenId, uint256 price) public {
        // Validate the token exists
        require(_exists(tokenId), "Token does not exist");

        // Validate token's ownership
        address owner = ownerOf(tokenId);
        require(msg.sender == owner, "Only the owner can set the price");

        // Update the register of prices
        tokenPrices[tokenId] = price;
    }

    function BuyToken(uint256 tokenId) public payable {
        // Validate the NFT exists
        require(_exists(tokenId), "Token does not exist");

        // Validate balance of the wallet who wants to buy the NFT
        uint256 price = tokenPrices[tokenId];
        require(
            msg.value >= price,
            "Wallet balance does not have enought currency to buy the NFT"
        );

        // Validate the buyer doesn't be the same owner
        address owner = ownerOf(tokenId);
        require(owner != msg.sender, "Owner cannot buy their own NFT");

        // Send the token to the buyer
        _transfer(owner, msg.sender, tokenId);

        // transfer the payment to the NFT owner
        payable(owner).transfer(msg.value);

        // Return founds whether the user sent more than the exactly value
        if (msg.value > price) {
            payable(msg.sender).transfer(msg.value - price);
        }

        emit TokenPurchased(msg.sender, tokenId, price);
    }
}
