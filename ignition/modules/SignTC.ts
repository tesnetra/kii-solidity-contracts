import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

require("dotenv").config();

const SignTCModule = buildModule("SignTCModule", (m) => {
  const signTC = m.contract("SignTC", [`${process.env.OWNER_ADDRESS}`]);

  return { signTC };
});

module.exports = SignTCModule;
