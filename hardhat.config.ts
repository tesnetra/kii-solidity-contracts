import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    kiichain: {
      url: "https://json-rpc.uno.sentry.testnet.v3.kiivalidator.com",
      accounts: [
        "0x79ae7e81503f375261afbf077e231c5f94d1018b5eb61b7d46f22c43d044627d",
      ],
      timeout: 120000,
    },
  },
};

export default config;
