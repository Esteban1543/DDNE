import React from "react";
import axios from "axios";
import { toast } from 'sonner';
import '../../../../assets/styles/modals.css';
import { URI } from "../../../../config";
// Importaciones Bootstrap
import { useState } from "react";
import BotonAgregar from "../../../molecules/BotonAgregar";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ModalFooter from "../../../molecules/ModalFooter";


// Modal de añadir proveedor
function ModalAddProver({actualizarpro}) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    // Recoger los datos a añador
    const inicalState = {
      identificacion: "",
      tipo_id: undefined,
      nombres: "DIEGO",
      apellidos: "lADINO",
      telefono: "123123",
      direccion: "Direccion Lugar",
      email: "Ejemplo@mail.com",
      nit: "",
      empresa: "Prueba Sas",
      descEmpresa: "Empresa Proveedor",
    };
  
    const URL = `${URI}/createprovider`;
  
    const [formData, setFormData] = useState(inicalState);
  
    const handleChange = (e) => {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value.trim(),
      }));
    };
  
    const addProver = async (e) => {
      e.preventDefault();
  
      // console.log(formData);
      try {
        const response = await axios.post(URL, formData);
  
        // Respuesta del backend
        if (response.data.success) {
            // alert('Se ha agregado el proveedor');
            toast.success(<h6><strong>Proveedor Creado con Exito ✅</strong></h6>)
            actualizarpro(true);
            handleClose();
        } else {
            // alert('No se ha podido ingresar el proveedor');
            toast.error(<h6><strong>No se ha podido agregar el Proveedor ❌</strong></h6>)
            handleClose();
        }
  
        setFormData(inicalState);
        // console.log(response);
      } catch (error) {
        alert("Error al enviar datos");
      }
    };
  
    return (
      <>
        <BotonAgregar openModal={handleShow} />
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="textmodal">Nuevo Proveedor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form action="/createprovider" method="post">
              {/* Identificacion */}
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  N° Identificación
                </InputGroup.Text>
                <Form.Control
                  id="identificacion"
                  name="identificacion"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={inicalState.identificacion}
                  onChange={handleChange}
                />
              </InputGroup>
  
              {/* Tipo identificacion */}
              <Form.Select
                defaultValue={inicalState.tipo_id}
                onChange={(e) => handleChange(e)}
                size="sm"
                name="tipo_id"
                id="tipo_id"
                className="mb-3"
              >
                <option value="null" disabled selected hidden>
                  Seleccione un tipo de Identificación
                </option>
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="CE">Cédula de Extranjería</option>
                <option value="Otro">Otro</option>
              </Form.Select>
  
              {/* Nombres */}
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Nombres
                </InputGroup.Text>
                <Form.Control
                  id="nombres"
                  defaultValue={inicalState.nombres}
                  name="nombres"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
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
                  onChange={handleChange}
                  defaultValue={inicalState.apellidos}
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
                  onChange={handleChange}
                  defaultValue={inicalState.telefono}
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
                  onChange={handleChange}
                  defaultValue={inicalState.direccion}
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
                  onChange={handleChange}
                  defaultValue={inicalState.email}
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
                  onChange={handleChange}
                  defaultValue={inicalState.nit}
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
                  onChange={handleChange}
                  defaultValue={inicalState.empresa}
                />
              </InputGroup>
  
              {/* Descripcion empresa */}
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Descripcion
                </InputGroup.Text>
                <Form.Control
                  id="descEmpresa"
                  name="descEmpresa"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  onChange={handleChange}
                  defaultValue={inicalState.descEmpresa}
                />
              </InputGroup>

              <ModalFooter click={handleClose} submit={addProver} />
              
            </form>
          </Modal.Body>
          {/* <Modal.Footer>
            // La funcion a poner es "restart()"
            //     como no la detecta y da error
            //     dejo la por defecto en los dos borones
  
            //     el de guardar cambios es "validacion()"
            
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={addProver}>
              Guardar cambios
            </Button>
          </Modal.Footer> */}
        </Modal>
      </>
    );
  }
  


export default ModalAddProver;