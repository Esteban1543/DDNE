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


// Modal de añadir cliente
function ModalAddClient({actualizarcli}) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Datos del formulario
    const inicilState = {
      identificacion: "",
      tipo_id: undefined,
      nombres: "pruebas",
      apellidos: "pruebas",
      telefono: "3105246532",
      direccion: "Calle prueba",
      email: "prueba@mail.com",
      nit: "",
      empresa: "Restaurante ...",
      descEmpresa: "Empresa Cliente"
    }
  
    const url = `${URI}/createclient`;

    const [formData, setFormData] = useState(inicilState);

    const handleChange = (e) => {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value
,      }));
    };

    const addClient = async (e) => {
      e.preventDefault();

      // console.log(formData);
      try{
        const response = await axios.post(url, formData);
        // console.log(response)

        if (response.data.success) {
          actualizarcli(true);
          handleClose();
          // alert('Se ha agregado el cliente');
          toast.success(<h6><strong>Cliente Creado con Exito ✅</strong></h6>)
        } else {
          // alert('NO se ha podido agregar el cliente')
          toast.error(<h6><strong>No se ha podido agregar el Cliente ❌</strong></h6>)
        }
        setFormData(inicilState);
        // console.log(response);
      } catch (error) {
        alert ('Error al enviar datos');
        console.log(error);
      }
    };
  
    return (
      <>
        <BotonAgregar openModal={handleShow} />
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="textmodal">Agregar Cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form action="/createclient" method="post">
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
                  defaultValue={inicilState.identificacion}
                  onChange={handleChange}
                />
              </InputGroup>
  
              {/* Tipo identificacion */}
              <Form.Select onChange={handleChange} value={inicilState.tipo_id} size="sm" name="tipo_id" id="tipo_id" className="mb-3">
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
                  name="nombres"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  defaultValue={inicilState.nombres}
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
                  defaultValue={inicilState.apellidos}
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
                  defaultValue={inicilState.telefono}
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
                  defaultValue={inicilState.direccion}
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
                  defaultValue={inicilState.email}
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
                  defaultValue={inicilState.nit}
                  onChange={handleChange}
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
                  defaultValue={inicilState.empresa}
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
                  defaultValue={inicilState.descEmpresa}
                  onChange={handleChange}
                />
              </InputGroup>

              <ModalFooter click={handleClose} submit={addClient} />

            </form>
          </Modal.Body>
          {/* <Modal.Footer>

            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={addClient}>
              Guardar cambios
            </Button>
          </Modal.Footer> */}
        </Modal>
      </>
    );
  }

  export default ModalAddClient;