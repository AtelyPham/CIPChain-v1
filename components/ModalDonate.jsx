import React from "react"
import { Button, Modal } from "semantic-ui-react"
import ContributeForm from "../components/ContributeForm"

function ModalExampleShorthand(props) {
  return (
    <Modal
      trigger={
        <Button floated="right" positive>
          Donate
        </Button>
      }
      header="Reminder!"
      content="Call Benjamin regarding the reports."
      actions={["Snooze", { key: "done", content: "Done", positive: true }]}
    >
      <ContributeForm address={props.addr}></ContributeForm>
    </Modal>
  )
}

export default ModalExampleShorthand
