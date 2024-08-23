import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    kiichain: {
      url: "https://a.sentry.testnet.kiivalidator.com:8645",
      accounts: [
        "0x79ae7e81503f375261afbf077e231c5f94d1018b5eb61b7d46f22c43d044627d",
      ],
    },
  },
};

export default config;
