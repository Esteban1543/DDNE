import React, { useState } from "react";
import { toast } from 'sonner';
import axios from "axios";
import { URI } from "../../../../config";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

// Icono de Editar
import Edit from "../../../../assets/imgs/icons/edit.svg";

function ModalEditProduct(props){
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const { Id } = props;
    const { Producto } = props;
    const { Comentario } = props;
    const { ActualizarProductor } = props;
  
    const [comentario, setComentario] = useState(Comentario)
  
    const almacenarComentario = (e) => {
      setComentario(e.target.value);
    }
  
    const enviarComentario = async () => {
      try {
        const response = await axios.put(`${URI}/update-Product/${Id}`, { comentario })
        console.log(response.data);
        toast.success(<h6><strong>Producto Actualizado con Exito ✅</strong></h6>)
        ActualizarProductor()
        handleClose();
      }catch (err){
        toast.error(<h6><strong>Error al Enviar los Datos ❌</strong></h6>)
        console.error(`Error al enviar datos: ${err}`);
        handleClose();
      }
    }
  
    return (
      <>
        <Button onClick={handleShow} variant="secundary">
          <img src={Edit} alt='Editar.jpg' />
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className='textmodal'>Editar { Producto }</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form action='/editproduct' method='post'>
    
              {/* Peso
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm" name="peso">
                  Peso
                </InputGroup.Text>
                <Form.Control
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </InputGroup> */}
  
              {/* Precio
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm" name="precio">
                  Precio
                </InputGroup.Text>
                <Form.Control
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </InputGroup> */}
              
              {/* Comentario */}
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm" name="newcomentario"  >Comentario</InputGroup.Text>
                <Form.Control
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={Comentario}
                  onChange={almacenarComentario}
                  required
                />
              </InputGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="button" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" onClick={enviarComentario}>
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  export default ModalEditProduct;