import React from "react";
import { Button, Card } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import { Link } from "../routes";

const CampaignIndex = ({ campaigns }) => {
  const items = campaigns.map((addr) => ({
    header: addr,
    description: (
      <Link route={`/campaigns/${addr}`}>
        <a>View Campaign</a>
      </Link>
    ),
    fluid: true,
  }));

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Link route="/campaigns/new">
          <a>
            <Button
              floated="right"
              content="Create Campaign"
              icon="add circle"
              primary
            />
          </a>
        </Link>
        <Card.Group items={items} />
      </div>
    </Layout>
  );
};

CampaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default CampaignIndex;
