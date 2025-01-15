import { Modal } from 'react-bootstrap';

function ModalTitle({title_modal}) {
  return (
    <Modal.Header>
      <Modal.Title >{title_modal}</Modal.Title>
    </Modal.Header>
  )
}

export default ModalTitle;