import { Modal, Button } from 'react-bootstrap';

function ModalFooter({ click, submit }) {
  return (
    <Modal.Footer>

      <Button
        className='btn-cancel'
        onClick={click}> 
        Cancelar 
      </Button>

      <Button
        className='btn-send'
        type="submit"
        onClick={submit}> 
        Guardar cambios 
      </Button>

    </Modal.Footer>
  )
}

export default ModalFooter
