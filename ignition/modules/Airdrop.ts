import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const AirdropModule = buildModule("AirdropModule", (m) => {
  const presigningData = m.contract("PreSigningData");

  return { presigningData };
});

module.exports = AirdropModule;
