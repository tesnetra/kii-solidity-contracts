import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

require("dotenv").config();

const OroModule = buildModule("OroModule", (m) => {
  const oro = m.contract("OroToken", [`0x${process.env.OWNER_ADDRESS}`]);

  return { oro };
});

module.exports = OroModule;
