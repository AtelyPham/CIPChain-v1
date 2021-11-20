import React from "react"
import { Button, Card } from "semantic-ui-react"
import factory from "../ethereum/factory"
import Layout from "../components/Layout"
import Donate from "../components/ModalDonate"
import CreateNew from "../components/ModalCreateNew"
import { Link } from "../routes"

const CampaignIndex = ({ campaigns }) => {
  const items = campaigns.map(addr => ({
    header: addr,
    description: (
      <>
        <Link route={`/campaigns/${addr}`}>
          <a>View Campaign</a>
        </Link>
        <Donate addr={addr}></Donate>
      </>
    ),
    fluid: true,
  }))
  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <CreateNew></CreateNew>
        {/* danh sách contract */}
        <Card.Group items={items}></Card.Group>
      </div>
    </Layout>
  )
}

// CampaignIndex.getInitialProps = async () => {
//   const campaigns = await factory.methods.getDeployedCampaigns().call();
//   // const campaigns = Campaign(props.query.address);
//   var Listsummary = await Promise.all(campaigns.map(async (item)=>{
//     const tempcampaigns = Campaign(item);
//     var summary = await tempcampaigns.methods.getSummary().call();
//     return summary;
//   }))
//   return { campaigns:Listsummary };
// };
CampaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call()
  return { campaigns }
}

export default CampaignIndex
