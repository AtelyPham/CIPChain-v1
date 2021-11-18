import React from "react";
import { Link } from "../../../routes";
import Layout from "../../../components/Layout";
import { Button, Table } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

const RequestIndex = ({ address, requests, requestsCount, approversCount }) => {
  const { Header, Row, HeaderCell, Body } = Table;

  const items = requests.map((request, idx) => (
    <RequestRow
      id={idx}
      request={request}
      key={idx}
      address={address}
      approversCount={approversCount}
    />
  ));

  return (
    <Layout>
      <h3>Requests</h3>
      <Link route={`/campaigns/${address}/requests/new`}>
        <a>
          <Button primary floated="right" style={{ marginBottom: 10 }}>
            Add Request
          </Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>{items}</Body>
      </Table>
      <div>Found {requestsCount} requests.</div>
    </Layout>
  );
};

RequestIndex.getInitialProps = async (props) => {
  const { address } = props.query;
  const campaign = Campaign(address);
  const requestsCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();

  const requests = await Promise.all(
    Array(parseInt(requestsCount))
      .fill()
      .map((_, index) => campaign.methods.requests(index).call())
  );

  return { address, approversCount, requests, requestsCount };
};

export default RequestIndex;
