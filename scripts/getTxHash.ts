import { defineChain, http, createPublicClient } from "viem";
import * as fs from "fs";

const testnet = defineChain({
  id: 123454321,
  name: "Kiichain Tesnet",
  nativeCurrency: { name: "kii", symbol: "kii", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://a.sentry.testnet.kiivalidator.com:8645"],
    },
  },
  blockExplorers: {
    default: {
      name: "Kiichain Testnet",
      url: "https://app.kiiglobal.io/kiichain",
      apiUrl: "",
    },
  },
  contracts: {},
});

const publicClient = createPublicClient({
  chain: testnet,
  transport: http(),
});

async function main() {
  const block = await publicClient.getBlock();
  const blockNumber = Number(block.number);
  const setQuantity = 1000;
  const pages = Math.floor(blockNumber / setQuantity);
  const leftovers = blockNumber - pages * setQuantity;

  let transactionsReceipts: any[] = [];

  // process pages
  for (let i = 0; i < pages; i++) {
    const setNumber = i * setQuantity;
    await Promise.all(
      Array(setQuantity)
        .fill(0)
        .map(async (_, idx) => {
          const block = await publicClient.getBlock({
            blockNumber: BigInt(setNumber + idx + 1),
            includeTransactions: true,
          });
          if (block.transactions.length) {
            const transaction = await publicClient.getTransactionReceipt({
              hash: block.transactions[0].hash,
            });
            transactionsReceipts.push(transaction);
          }
          console.log(`Processed Block: ${setNumber + idx + 1}`);
        })
    );
  }

  // process leftovers
  await Promise.all(
    Array(leftovers)
      .fill(0)
      .map(async (_, idx) => {
        const block = await publicClient.getBlock({
          blockNumber: BigInt(pages * setQuantity + idx + 1),
          includeTransactions: true,
        });
        if (block.transactions.length) {
          const transaction = await publicClient.getTransactionReceipt({
            hash: block.transactions[0].hash,
          });
          transactionsReceipts.push(transaction);
        }
        console.log(
          `Processed Left Over Block: ${pages * setQuantity + idx + 1}`
        );
      })
  );

  fs.writeFile(
    "./transactions.json",
    JSON.stringify(
      transactionsReceipts,
      (_, v) => (typeof v === "bigint" ? v.toString() : v),
      4
    ),
    function (err) {
      if (err) throw err;
      console.log(`Saved ${transactionsReceipts.length} transactions in transactions.json`);
    }
  );
}

main()
  .then(() => {
    const unwatch = publicClient.watchBlocks({
      includeTransactions: true,
      onBlock: async (block) => {
        if (block.transactions.length) {
          const transaction = await publicClient.getTransactionReceipt({
            hash: block.transactions[0].hash,
          });
          console.log(transaction);
        } else {
          console.log(block.transactions);
        }
      },
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
