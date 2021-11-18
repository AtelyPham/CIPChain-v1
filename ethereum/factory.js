import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const addr = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  addr
);

export default instance;
