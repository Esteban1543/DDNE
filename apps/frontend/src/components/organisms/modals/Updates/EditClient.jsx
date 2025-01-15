import React from "react";
import axios from "axios";
import { toast } from 'sonner';
import "../../../../assets/styles/modals.css";
import { URI } from "../../../../config";
// Importaciones Bootstrap
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ModalFooter from "../../../molecules/ModalFooter";

import Edit from '../../../../assets/imgs/icons/edit.svg';

export default function ModalEditClient({id, nombres,  apellidos, telefono, direccion, email, nit, empresa, desc_empresa, reload}) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const InicialState = {
      id: id,
      nombres: nombres,
      apellidos: apellidos, 
      telefono: telefono, 
      direccion: direccion,
      email: email, 
      nit: nit, 
      empresa: empresa,
      desc_empresa: desc_empresa
    }

    const url = `${URI}/updateclient`;

    const [formData, setFormData] = useState(InicialState);

    const handleChange = (e) => {
      setFormData((prevdata) => ({
        ...prevdata,
        [e.target.name] : e.target.value,
      }));
    };

    const updateclient = async (e) => {
      e.preventDefault();

      console.log(formData);

      try {
        const response = await axios.put(`${url}`, formData)
        console.log(response.data);

        if (response.data.success) {
          // alert('Se ha editado el cliente correctamente ✅');
          toast.success(<h6><strong>Cliente Actualizado con Exito ✅</strong></h6>)
          reload(true);
          handleClose()
        } else {
          // alert('No se ha podido editar el cliente');
          toast.error(<h6><strong>No se ha podido editar el Cliente❌</strong></h6>)
          handleClose();
        }
        // setFormData(InicialState);
        console.log(response)
      } catch (error) {
        alert('Error al enviar datos')
      }
    }
  


    return (
      <>
        <Button
          onClick={handleShow}
          data-bs-toggle="modal"
          data-bs-target="#editModal<%=index%>"
        >
          <img src={Edit} alt="Editar.png" />
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="textmodal">Editar Cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form action="/editclient" method="post">

          <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  N° Identificación
                </InputGroup.Text>
                <Form.Control
                  id="id"
                  name="id"
                  aria-label="Small"
                  defaultValue={InicialState.id}
                  disabled
                  aria-describedby="inputGroup-sizing-sm"
                />
              </InputGroup>
  
              {/* Nombres */}
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Nombres
                </InputGroup.Text>
                <Form.Control
                  id="nombres"
                  name="nombres"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={InicialState.nombres}
                  onChange={handleChange}
                />
              </InputGroup>
  
              {/* Apellidos */}
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Apellidos
                </InputGroup.Text>
                <Form.Control
                  id="apellidos"
                  name="apellidos"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={InicialState.apellidos}
                  onChange={handleChange}
                />
              </InputGroup>
  
              {/* Telefono */}
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Telefono
                </InputGroup.Text>
                <Form.Control
                  id="telefono"
                  name="telefono"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={InicialState.telefono}
                  onChange={handleChange}
                />
              </InputGroup>
  
              {/* Direccion */}
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Dirrección
                </InputGroup.Text>
                <Form.Control
                  id="direccion"
                  name="direccion"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={InicialState.direccion}
                  onChange={handleChange}
                />
              </InputGroup>
  
              {/* Email */}
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Correo Electronico
                </InputGroup.Text>
                <Form.Control
                  id="email"
                  name="email"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={InicialState.email}
                  onChange={handleChange}
                />
              </InputGroup>
  
              {/* NIT Empresa */}
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Numero de NIT
                </InputGroup.Text>
                <Form.Control
                  id="nit"
                  name="nit"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={InicialState.nit}
                  onChange={handleChange}
                  disabled
                />
              </InputGroup>
  
              {/* Nombre Empresa */}
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Nombre empresa
                </InputGroup.Text>
                <Form.Control
                  id="empresa"
                  name="empresa"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={InicialState.empresa}
                  onChange={handleChange}
                />
              </InputGroup>
  
              {/* Descripcion empresa */}
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Descripcion
                </InputGroup.Text>
                <Form.Control
                  id="desc_empresa"
                  name="desc_empresa"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={InicialState.desc_empresa}
                  onChange={handleChange}
                />
              </InputGroup>
      
              <ModalFooter click={handleClose} submit={updateclient} />
              
            </form>
          </Modal.Body>
          {/* <Modal.Footer>

            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={updateclient}>
              Guardar cambios
            </Button>
          </Modal.Footer> */}
        </Modal>
      </>
    );
  }
  