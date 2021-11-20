import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import New from "../components/New";
function ModalExampleModal() {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button 
                floated="right"
                content="Create Campaign"
                icon="add circle"
                primary>Create Campaign</Button>}
    >
      <Modal.Header>Create Campaign</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <New onClose={()=>setOpen(false)}></New>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ModalExampleModal