import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

require("dotenv").config();

const InkiiModule = buildModule("InkiiModule", (m) => {
  const inkii = m.contract("InkiiToken", [`0x${process.env.OWNER_ADDRESS}`]);

  return { inkii };
});

module.exports = InkiiModule;
