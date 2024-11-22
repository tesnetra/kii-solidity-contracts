import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

require("dotenv").config();

// Initial values
const daysPerPeriod = 7;
const reward = 0.1;

const periodInSecond = daysPerPeriod * 24 * 60 * 60; // 604800 sec
const InkiiStakingModule = buildModule("InkiiStakingModule", (m) => {
  const InkiiStaking = m.contract("InkiiStaking", [
    periodInSecond,
    reward * 100, // Multiply by 100 because solidity does not handle float
  ]);

  return { InkiiStaking };
});

module.exports = InkiiStakingModule;
