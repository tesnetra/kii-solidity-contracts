import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    kiichain: {
      url: "https://dos.sentry.testnet.v3.kiivalidator.com:8547",
      accounts: ["0x<PRIVATE_KEY>"],
      timeout: 120000,
    },
  },
};

export default config;
