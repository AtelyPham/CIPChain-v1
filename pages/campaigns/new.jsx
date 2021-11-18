import React, { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

const CampaignNew = () => {
  const [inputVal, setInputVal] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(inputVal)
        .send({ from: accounts[0] });

      Router.pushRoute("/");
    } catch (error) {
      setErrorMsg(error.message);
    }

    setIsLoading(false);
  };

  return (
    <Layout>
      <h3>New Campaigns</h3>

      <Form onSubmit={onSubmit} error={!!errorMsg}>
        <Form.Field>
          <label htmlFor="minimum-contribution">Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={inputVal}
            onChange={(event) => setInputVal(event.target.value)}
          />
        </Form.Field>

        <Message error header="Oops!" content={errorMsg} />
        <Button primary loading={isLoading}>
          Create!
        </Button>
      </Form>
    </Layout>
  );
};

export default CampaignNew;
