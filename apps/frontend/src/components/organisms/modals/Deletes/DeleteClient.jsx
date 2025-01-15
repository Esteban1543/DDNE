import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import ModalFooter from '../../../molecules/ModalFooter';
import Trash from '../../../../assets/imgs/icons/trash.svg';
import { URI } from '../../../../config';
import { toast } from 'sonner';
import axios from 'axios';

// URI 🌐
const endpoint = `${URI}/deleteClient`;

function DeleteModal({ data_id, titulo, reload }) {

  //🔸 Funcionamiento del Modal en Pantalla 
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);


  const handleSubmit = async (e) => {
    console.log(data_id)
    e.preventDefault();

    try {
        const data = await axios.put(`${endpoint}/${data_id}`);
        console.log(data.data);

        if (data.data.success) {
            // alert('Se ha eliminado el cliente correctamente');
            toast.success(<h6><strong>Se ha inhabilitado exitosamente el Cliente✅</strong></h6>)
            reload(true); 
            handleClose();
        } else {
            // alert('No se ha podido eliminar al cliente');
            toast.error(<h6><strong>No se ha podido deshabilitar el Cliente</strong></h6>)
            handleClose();
        }

    } catch (error) {
        alert('Error al enviar datos')
    }
  };

  return (
    <>



      <Button>
        <img
          style={{ height: '58px', cursor: 'pointer' }}
          onClick={handleShow}
          src={Trash}
          alt="eliminar"
        />
      </Button>


      <Modal show={show} onHide={handleClose} style={{ textAlign: 'center' }}>

        <Form onSubmit={handleSubmit}>

          <h4 style={{ padding: '2rem 0' }}>¿Está seguro de eliminar el Registro  <span style={{ color: 'red' }}>{data_id}</span> de {titulo}?</h4>

          <ModalFooter click={handleClose} submit={handleSubmit} />
        </Form>

      </Modal>
    </>
  )
}

export default DeleteModal;