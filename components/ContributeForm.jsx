import React, { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

const ContributeForm = ({ address }) => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(address);
    setIsLoading(true);
    setErrorMsg("");

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .contribute()
        .send({ from: accounts[0], value: web3.utils.toWei(value, "ether") });

      Router.replaceRoute(`/campaigns/${address}`);
    } catch (error) {
      setErrorMsg(error.message);
    }

    setIsLoading(false);
  };

  return (
    <Form onSubmit={onSubmit} error={!!errorMsg}>
      <Form.Field>
        <label htmlFor="amount-to-contribute">Amount to Contribute</label>
        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          label="ether"
          labelPosition="right"
        />
      </Form.Field>
      <Message error header="Oops!" content={errorMsg} />
      <Button primary loading={isLoading}>
        Contribute!
      </Button>
    </Form>
  );
};

export default ContributeForm;
