import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    kiichain: {
      url: "https://a.sentry.testnet.kiivalidator.com:8645",
      accounts: [""],
    },
  },
};

export default config;
