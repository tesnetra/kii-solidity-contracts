import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const InkiiModule = buildModule("InkiiModule", (m) => {
  const inkii = m.contract("InkiiToken", [
    "0xA18344d76Cf42dB408db7f27d1167BaeBeDFe1Ee",
  ]);

  return { inkii };
});

module.exports = InkiiModule;
