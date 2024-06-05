import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    kiichain: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY || ''],
    },
  },
};

export default config;
