const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "..", ".env.local") });

const mnemonicPhrase = process.env.MNEMONIC_PHRASE || "";
const ropstenUrl = process.env.INFURA_ROPSTEN_URL || "";
const rinkebyUrl = process.env.INFURA_RINKEBY_URL || "";

const provider = new HDWalletProvider(mnemonicPhrase, rinkebyUrl);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "1000000", from: accounts[0], gasPrice: "5000000000" });

  console.log("Contract deployed to", result.options.address);
};
deploy();
