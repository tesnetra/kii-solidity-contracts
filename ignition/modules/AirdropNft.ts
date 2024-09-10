import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const AirdropNftModule = buildModule("AirdropNftModule", (m) => {
  const airdropNft = m.contract("AirdropNFT");

  return { airdropNft };
});

module.exports = AirdropNftModule;
