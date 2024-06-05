import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SwapModule = buildModule("SwapModule", (m) => {
  const swap = m.contract("Swap");

  return { swap };
});

module.exports = SwapModule;