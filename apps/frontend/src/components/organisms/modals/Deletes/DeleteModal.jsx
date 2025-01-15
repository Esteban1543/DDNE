import { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { toast } from 'sonner';
// Componentes 🎗️
import ModalFooter from '../../../molecules/ModalFooter';

// Funciones 📌
import { consultaDeleteBackend } from '../../../../helpers/consultaDeleteBackend';

// URI 🌐
import { URI } from '../../../../config';

function DeleteModal({imagen_ruta, altura, actualizar, data_id, titulo, endpoint }) {

  //🔸 Funcionamiento del Modal en Pantalla 
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  //🔸 Envío de Datos Formulario a Backend 
  const handleSubmit = async (e) => {

    const {success, message, error } = await consultaDeleteBackend(e, URI + endpoint, data_id )
    // success ? (()=>{alert(message); actualizar(true)})() : (()=> { alert(message); console.log(error) })();
    success ? (()=>{toast.success(<h6><strong>Registro inhabilitado exitosamente ✅</strong></h6>); actualizar(true)})() : (() => { console.error(error); toast.error(<h6><strong>{message}</strong></h6>) })();
    
    handleClose();
  };

  return (
    <>
      
      <img
        style={{ height: `${altura}`, cursor: 'pointer' }}
        onClick={handleShow}
        src={imagen_ruta}
        alt="editar"
      />


      <Modal show={show} onHide={handleClose} style={{ textAlign: 'center' }}>

        <Form onSubmit={handleSubmit}>

          <h4 style={{ padding: '2rem 0' }}>¿Está seguro de eliminar el Registro <span style={{color:'red'}}>{data_id}</span> de {titulo}?</h4>

          <ModalFooter click={handleClose} submit={handleSubmit} />
        </Form>

      </Modal>
    </>
  )
}

export default DeleteModal;