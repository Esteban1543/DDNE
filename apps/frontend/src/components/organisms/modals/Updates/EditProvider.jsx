import React from "react";
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
import axios from "axios";

// Iconos
import Edit from '../../../../assets/imgs/icons/edit.svg';

function ModalEditProver( {data_id, nombres, apellidos, telefono, direccion, correo, nit, nombre_empresa, desc_empresa, reload} ) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  //Datos del formulario
  const InicialState = {
    nombres: nombres,
    apellidos: apellidos,
    telefono: telefono,
    direccion: direccion,
    email: correo,
    nit: nit,
    nombre_empresa: nombre_empresa,
    desc_empresa: desc_empresa
  }

  const URL = `${URI}/updateprovider`;

  const [formData, setFormData] = useState(InicialState);

  const handleChange = (e) => {    
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name] : e.target.value.trim(),
    }));
  };


  const updateProvider = async (e) => {
    e.preventDefault();

    // console.log('EdirProvider >> ',formData);
    
    try {
      const response = await axios.put(`${URL}/${data_id}`, formData)
      console.log(response.data);

      if (response.data.success) {
          // alert('Se ha editado el proveedor correctamente ✅');
          toast.success(<h6><strong>Proveedor Actualizado con Exito ✅</strong></h6>)
          reload(true);
        handleClose();
      } else {
          // alert('No se ha podido ingresar el proveedor');
          toast.error(<h6><strong>No se ha podido editar el Proveedor ❌</strong></h6>)
          handleClose();
      }
      
      // // setFormData(InicialState); Error al inicializar los datos📌
      // console.log(response);
      
    } catch (error) {
      alert('Error al enviar datos')
    }
  };


    return (
      <>    
        <Button onClick={handleShow}>
          <img src={Edit} alt="editar.png" />
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="textmodal">Editar Proveedor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form action="/editprovider" method="post">
              {/* Identificacion */}
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  N° Identificación
                </InputGroup.Text>
                <Form.Control                  
                  defaultValue={data_id}
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  disabled
                />
              </InputGroup>
  
              {/* Tipo identificacion */}
              {/* <Form.Select size="sm" name="tipo_id" id="tipo_id" className="mb-3">
                <option value="null" disabled selected hidden>
                  Seleccione un tipo de Identificación
                </option>
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="CE">Cédula de Extranjería</option>
                <option value="Otro">Otro</option>
              </Form.Select>
              */}
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
                  id="nombre_empresa"
                  name="nombre_empresa"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={InicialState.nombre_empresa}
                  onChange={handleChange}
                  disabled
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
                  disabled
                />
              </InputGroup>

              <ModalFooter click={handleClose} submit={updateProvider} />

            </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }


  export default ModalEditProver;