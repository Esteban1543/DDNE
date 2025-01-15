import { useState } from 'react';
import { toast } from 'sonner';
import { Modal, Form, Button } from 'react-bootstrap';
import ModalFooter from '../../../molecules/ModalFooter';
import axios from 'axios';
import Trash from '../../../../assets/imgs/icons/trash.svg';
import { URI } from '../../../../config';

function DeleteUser({ ActualizarUsuarios, Usuario  }) {

  //🔸 Funcionamiento del Modal en Pantalla 
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const id = Usuario.usuario_id;
      const data = await axios.patch(`${URI}/delete_Usuario/${id}`);
      
      console.log(data.data);

      if (data.data.success) {
        // alert('Se ha eliminado el usuario');
        toast.success(<h6><strong>Se ha inhabilitado exitosamente el usuario ✅</strong></h6>)
        ActualizarUsuarios();
        handleClose();
      } else {
        // alert('No se pudo eliminar al usuario');
        toast.error(<h6><strong>No se ha podido deshabilitar el Usuario</strong></h6>)
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

          <h4 style={{ padding: '2rem 0' }}>¿Está seguro de eliminar el Registro <span style={{ color: 'red' }}>{Usuario.alias}</span> de {'Usuarios'}?</h4>

          <ModalFooter click={handleClose} submit={handleSubmit} />
        </Form>

      </Modal>
    </>
  )
}

export default DeleteUser;